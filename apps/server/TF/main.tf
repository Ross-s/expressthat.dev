terraform {
  backend "local" {
    path = "/home/jenkins/tf-backend/apps/server/terraform.tfstate"
  }
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
      version = "3.0.2"
    }

    nginxproxymanager = {
      source = "Sander0542/nginxproxymanager"
      version = "0.0.36"
    }
  }
}

provider "docker" {
  host = "tcp://${var.docker_host}:2376"

  registry_auth {
    address = var.docker_registry
    username = var.docker_registry_username
    password = var.docker_registry_password
  }
}

provider "nginxproxymanager" {
  host     = "http://${var.docker_host}:81"
  username = var.proxy_username
  password = var.proxy_password
}