terraform {
  backend "local" {
    path = "/home/jenkins/tf-backend/apps/Express That Apps/terraform.tfstate"
  }
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
      version = "3.0.2"
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