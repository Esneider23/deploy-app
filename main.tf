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


output "cosmosdb_connectionstrings" {
   value = "host=c-${azurerm_cosmosdb_postgresql_cluster.database.name}.postgres.cosmos.azure.com port=5432;dbname=citus;user=citus;password=${azurerm_cosmosdb_postgresql_cluster.database.administrator_login_password};sslmode=require"
   sensitive   = true
}

resource "azurerm_public_ip" "ip_public" {
  name                = "ip-motorshop"
  location            = azurerm_resource_group.rg_service_web.location
  resource_group_name = azurerm_resource_group.rg_service_web.name
  allocation_method   = "Static"

  tags = {
    environment = "Production"
  }
}

resource "azurerm_container_group" "tf_cg_utb" {
  name                  = "motorshop"
  location              = azurerm_resource_group.rg_service_web.location #utilising the resource group
  resource_group_name   = azurerm_resource_group.rg_service_web.name #utilising the resource group

  ip_address_type       = "Public"
  dns_name_label        = "MOTORSHOP" #friendly name we want to give our domain
  os_type               = "Linux"

  # Specify the container information
  container {
    name = "app-deploy"
    image = "esneider23/app-deploy:${var.imagebuild}"
    cpu = "1"
    memory = "1"

    ports {
        port = 80
        protocol = "TCP"
    }
  }

resource "azurerm_lb" "app_gateway" {
  name                = "app-gateway"
  location            = azurerm_resource_group.rg_service_web.location
  resource_group_name = azurerm_resource_group.rg_service_web.name

  frontend_ip_configuration {
    name                 = "PublicIPAddress"
    public_ip_address_id = azurerm_public_ip.lb_public_ip.id
  }

  backend_address_pool {
    name = "app-backend-pool"
  }

  probe {
    name = "http-probe"
    protocol = "Http"
    request_path = "/"
    port = 80
  }

  rule {
    name = "http-rule"
    frontend_ip_configuration_id = azurerm_lb.app_gateway.frontend_ip_configuration[0].id
    backend_address_pool_id = azurerm_lb.app_gateway.backend_address_pool[0].id
    probe_id = azurerm_lb.app_gateway.probe[0].id
    frontend_port = 80
    backend_port = 80
    protocol = "Tcp"
  }
}

resource "azurerm_network_interface_backend_address_pool_association" "example" {
  network_interface_id    = azurerm_container_group.tf_cg_utb.network_interface_ids[0]
  ip_configuration_name   = "internal"
  backend_address_pool_id = azurerm_lb.app_gateway.backend_address_pool[0].id
}