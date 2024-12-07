variable "docker_host" {
  description = "Docker host for containers and socket"
}

variable "docker_registry" {
  description = "Docker registry"
}

variable "docker_registry_username" {
  description = "Docker username"
}

variable "docker_registry_password" {
  description = "Docker password"
}

variable "build_id" {
  description = "Build ID"
}

variable "proxy_username" {
  description = "Proxy username"
}

variable "proxy_password" {
  description = "Proxy password"
}

variable "domain_name" {
  description = "Domain name"
  default = "expressthat.dev"
}

variable "internal_host" {
  description = "Internal host"
  default = "172.17.0.1"
}