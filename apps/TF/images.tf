resource "docker_image" "docs" {
    name = "${replace(var.docker_registry, "http://", "")}/docs:${var.build_id}"
}