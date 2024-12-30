resource "docker_image" "admin" {
    name = "${replace(var.docker_registry, "http://", "")}/admin:${var.build_id}"
}