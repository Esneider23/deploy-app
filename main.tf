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
