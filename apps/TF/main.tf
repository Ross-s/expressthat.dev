terraform {
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }
}

provider "docker" {
  host = var.docker_socket

  registry_auth {
    address = var.docker_registry
    username = var.docker_registry_username
    password = var.docker_registry_password
  }
}