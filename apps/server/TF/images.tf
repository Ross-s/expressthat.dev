resource "docker_image" "admin" {
    name = "${replace(var.docker_registry, "http://", "")}/admin:${var.build_id}"
}

resource "docker_image" "keydb" {
    name = "eqalpha/keydb:latest"
}

resource "docker_image" "postgres" {
    name = "postgres:17-alpine"
}

resource "docker_image" "logto" {
  name = "svhd/logto:latest"
}