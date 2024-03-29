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
  sku_name            =  "S1"
}

resource "azurerm_service_plan" "app2" {
  location            = "westus3"
  name                = "app-motorshop-2"
  os_type             = "Linux"
  resource_group_name = azurerm_resource_group.rg_service_web.name
  sku_name            = "S1"
}

resource "azurerm_linux_web_app" "app-motorshop" {
  https_only          = true
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


resource "azurerm_linux_web_app" "app-motorshop-2" {
  name                = "app-motorshop-2" 
  location            = azurerm_service_plan.app2.location
  resource_group_name = azurerm_resource_group.rg_service_web.name
  service_plan_id     = azurerm_service_plan.app2.id
  site_config {
    application_stack{
      docker_image_name = "esneider23/app-deploy:${var.imagebuild}"
      docker_registry_url = "https://index.docker.io"
    }
  }
}

resource "azurerm_traffic_manager_profile" "motorshop-tm" {
  name                   = "motorshop-Tm"
  resource_group_name    = azurerm_resource_group.rg_service_web.name
  traffic_routing_method = "Weighted"
  dns_config {
    relative_name = "motorshop-tm"
    ttl           = 60
  }
  monitor_config {
    path     = "/"
    port     = 80
    protocol = "HTTPS"
  }
}

resource "azurerm_traffic_manager_azure_endpoint" "primero"{
  name = "primero"
  profile_id = azurerm_traffic_manager_profile.motorshop-tm.id
  priority = 1
  weight = 50
  target_resource_id = azurerm_linux_web_app.app-motorshop.id
}

resource "azurerm_traffic_manager_azure_endpoint" "segundo"{
  name               = "segundo"
  profile_id         = azurerm_traffic_manager_profile.motorshop-tm.id
  priority           = 2
  weight             = 50
  target_resource_id = azurerm_linux_web_app.app-motorshop-2.id
}

output "endpoint" {
  value = azurerm_traffic_manager_profile.motorshop-tm.fqdn
}
