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

resource "azurerm_lb" "lb_motorshop" {
  name                  = "motorshop-lb"
  location              = azurerm_resource_group.rg_service_web.location
  resource_group_name   = azurerm_resource_group.rg_service_web.name

  frontend_ip_configuration {
    name                = "lb_frontend_motorshop"
    public_ip_address {
      name = "lb_public_ip_motorshop"
      allocation_method = "Dynamic"
    }
  }

  backend_address_pool {
    name = "lb_backend_pool_motorshop"
  }

  load_balancing_rule {
    name = "lb_rule_motorshop"
    protocol = "Tcp"
    frontend_port = 80
    backend_port = 80
    frontend_ip_configuration {
      id = azurerm_lb_frontend_ip_configuration.lb_frontend_motorshop.id
    }
    backend_address_pool {
      id = azurerm_lb_backend_address_pool.lb_backend_pool_motorshop.id
    }
  }
}

resource "azurerm_container_group" "tf_cg_utb" {
  name                  = "motorshop"
  location              = azurerm_resource_group.rg_service_web.location
  resource_group_name   = azurerm_resource_group.rg_service_web.name

  ip_address_type       = "None"
  dns_name_label        = "MOTORSHOP"
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

  network_profile {
    load_balancers {
      id = azurerm_lb.lb_motorshop.id
    }
  }
}