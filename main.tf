terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.78.0"
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
  name                            = "database-proyect"
  resource_group_name             = azurerm_resource_group.database.name
  location                        = azurerm_resource_group.database.location
  administrator_login_password    = "klmdvklsnknskkfehwi2r3edvcdnowqch90bu3chduiynicsh"
  coordinator_storage_quota_in_mb = 131072
  coordinator_vcore_count         = 2
  node_count                      = 0
}

output "cosmosdb_connectionstrings" {
   value = "host=c-${azurerm_cosmosdb_postgresql_cluster.database.name}.postgres.cosmos.azure.com port=5432;dbname=citus;user=citus;password=${azurerm_cosmosdb_postgresql_cluster.database.administrator_login_password};sslmode=require"
   sensitive   = true
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
}
