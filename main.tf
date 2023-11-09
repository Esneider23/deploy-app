terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.78.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "backup-terraform"
    storage_account_name = "terraformstateproyect"
    container_name       = "tfstatesdevops"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {
  }
}

resource "azurerm_resource_group" "rg_service_web" {
  name = "rg_service_web" # this is the name on azure
  location = "eastus" # data center location on azure
}

variable "imagebuild" {
  type = string
  description = "the latest image build version"
}

resource "azurerm_cosmosdb_postgresql_cluster" "database" {
  name                            = "database-motorshop"
  resource_group_name             = azurerm_resource_group.rg_service_web.name
  location                        = azurerm_resource_group.rg_service_web.location
  administrator_login_password    = "klmdvklsnknskkfehwi2r3edvcdnowqch90b-au3chduiynicsh"
  coordinator_storage_quota_in_mb = 131072
  coordinator_vcore_count         = 2
  node_count                      = 0
}

resource "azurerm_cosmosdb_postgresql_firewall_rule" "allow_all_rule" {
  name                = "AllowAll_2023-11-9_11-9-10"
  cluster_id          = azurerm_cosmosdb_postgresql_cluster.database.id
  start_ip_address    = "0.0.0.0"
  end_ip_address      = "255.255.255.255"
  depends_on = [
    azurerm_cosmosdb_postgresql_cluster.database
  ]
}

resource "azurerm_cosmosdb_postgresql_firewall_rule" "client_ip_rule" {
  name                = "ClientIPAddress_2023-11-9_11-9-12"
  cluster_id          = azurerm_cosmosdb_postgresql_cluster.database.id
  start_ip_address    = "177.254.86.86"
  end_ip_address      = "177.254.86.86"
  depends_on = [
    azurerm_cosmosdb_postgresql_cluster.database
  ]
}


resource "azurerm_service_plan" "app" {
  name                = "app-service-plan"
  resource_group_name = azurerm_resource_group.rg_service_web.name
  location            = azurerm_resource_group.rg_service_web.location
  os_type             = "Linux"
  sku_name            =  "B1"
}

resource "azurerm_linux_web_app" "app-motorshop" {
  name                = "app-motorshop"
  resource_group_name = azurerm_resource_group.rg_service_web.name
  location            = azurerm_service_plan.app.location
  service_plan_id     = azurerm_service_plan.app.id

  site_config {
    application_stack{
      docker_image_name = "esneider23/app-deploy:${var.imagebuild}"
      docker_registry_url = "https://index.docker.io"
    }
  }
}

resource "azurerm_public_ip" "ip_motorshop" {
  name                = "ip-motorshop"
  location            = azurerm_resource_group.rg_service_web.location
  resource_group_name = azurerm_resource_group.rg_service_web.name
  allocation_method   = "Static"
  sku                 = "Standard"
}


resource "azurerm_lb" "lb_motorshop" {
  name                = "lb-motorshop"
  location            = azurerm_resource_group.rg_service_web.location
  resource_group_name = azurerm_resource_group.rg_service_web.name

  frontend_ip_configuration {
    name                 = "PublicIPAddress"
    public_ip_address_id = azurerm_public_ip.ip_motorshop.id
  }

  backend_address_pool {
    name = "BackendAddressPool"
  }

  probe {
    name                 = "HTTPProbe"
    protocol             = "Http"
    request_path         = "/"
    port                 = 80
    interval_in_seconds  = 15
    number_of_probes     = 2
  }

  load_balancing_rule {
    name                        = "HTTPRule"
    frontend_ip_configuration_id = azurerm_lb.myloadbalancer.frontend_ip_configuration[0].id
    backend_address_pool_id     = azurerm_lb.myloadbalancer.backend_address_pool[0].id
    probe_id                    = azurerm_lb.myloadbalancer.probe[0].id
    protocol                    = "Tcp"
    frontend_port               = 80
    backend_port                = 80
  }
}

resource "azurerm_virtual_network" "network-motorshop" {
  name                = "network-motorshop"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.rg_service_web.location
  resource_group_name = azurerm_resource_group.rg_service_web.name
}

resource "azurerm_subnet" "subnet-motorshop" {
  name                 = "subnet-motorshop"
  resource_group_name  = azurerm_resource_group.rg_service_web.name
  virtual_network_name = azurerm_virtual_network.network-motorshop.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_app_service_virtual_network_swift_connection" "connection" {
  app_service_id                 = azurerm_linux_web_app.app-motorshop.id
  swift_resource_id              = azurerm_lb.lb_motorshop.id
  subnet_id                      = azurerm_subnet.subnet-motorshop.id
  swift_network_connector_name   = "connection"
}





