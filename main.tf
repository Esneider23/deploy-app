terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.28.0"
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