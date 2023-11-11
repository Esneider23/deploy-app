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

resource "azurerm_traffic_manager_profile" "traffic-manager-motorshop" {
  name               = "traffic-manager-motorshop"
  resource_group_name = azurerm_resource_group.rg_service_web.name
  traffic_routing_method = "Priority"

  dns_config {
    relative_name = "motorshop"
    ttl           = 60
  }

  monitor_config {
    protocol = "HTTP"
    port     = 80
    path     = "/"
  }
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

resource "azurerm_app_service_custom_hostname_binding" "custom_hostname_binding-1" {
  app_service_name    = "app-motorshop"
  hostname            = "motorshop.azurewebsites.net"
  resource_group_name = azurerm_resource_group.rg_service_web.name
  depends_on = [
    azurerm_linux_web_app.app-motorshop,
  ]
}

resource "azurerm_app_service_custom_hostname_binding" "custom_hostname_binding-2" {
  app_service_name    =  "app-motorshop"
  hostname            = "motorshop-tmp.trafficmanager.net"
  resource_group_name = azurerm_resource_group.rg_service_web.name
  depends_on = [
    azurerm_linux_web_app.app-motorshop,
  ]
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

resource "azurerm_app_service_custom_hostname_binding" "custom_hostname_binding_3" {
  app_service_name    = "motorshop-tmp-2"
  hostname            = "motorshop-tmp-2.trafficmanager.net"
  resource_group_name = azurerm_resource_group.rg_service_web.name
  depends_on = [
    azurerm_linux_web_app.app-motorshop-2,
  ]
}

resource "azurerm_app_service_custom_hostname_binding" "custom_hostname_binding_4" {
  app_service_name    = "motorshop-tmp-2"
  hostname            = "motorshop-tmp-2.azurewebsites.net"
  resource_group_name = azurerm_resource_group.rg_service_web.name
  depends_on = [
    azurerm_linux_web_app.app-motorshop-2,
  ]
}

resource "azurerm_traffic_manager_azure_endpoint" "first-endpoint" {
  name                = "motorshop-first-endpoint"
  profile_id          = azurerm_traffic_manager_profile.traffic-manager-motorshop.id
  priority            = 1
  target_resource_id  = azurerm_linux_web_app.app-motorshop.id
}

resource "azurerm_traffic_manager_azure_endpoint" "segund-endpoint" {
  name                 = "motorshop-segund-endpoint"
  profile_id           = azurerm_traffic_manager_profile.traffic-manager-motorshop.id
  priority             = 2
  target_resource_id   = azurerm_linux_web_app.app-motorshop-2.id
}

