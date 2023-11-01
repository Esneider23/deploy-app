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

resource "azurerm_resource_group" "rg_service_web" {
  name = "rg_service_web" # this is the name on azure
  location = "eastus" # data center location on azure
}

resource "azurerm_service_plan" "service_plan" {
  name                = "service_plan" # this is the name on azure
  location            = azurerm_resource_group.rg_service_web.location
  resource_group_name = azurerm_resource_group.rg_service_web.name
  os_type             = "Linux"
  sku {
    tier = "Free"
    size = "F1"
  }
}

resource "azurerm_app_service" "web_app_client" {
    name                = "MOTORSHOP" # this is the name on azure
    resource_group_name = azurerm_resource_group.rg_service_web.name
    location            = azurerm_resource_group.rg_service_web.location
    service_plan_id     = azurerm_service_plan.service_plan.id
    site_config {
        use_32_bit_worker_process = true
        linux_fx_version = "NODE|12-lts"
  }
}

resource "azurerm_app_service_source_control" "sourcecontrol" {
  app_id             = azurerm_app_service.web_app_client.id
  repo_url           = "https://github.com/Esneider23/deploy-app.git"
  branch             = "main"
  use_manual_integration = false
  use_mercurial      = false
}

output "url" {
  value = azurerm_app_service.web_app_client.default_site_hostname
}
