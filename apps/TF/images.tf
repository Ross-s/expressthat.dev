resource "docker_image" "docs" {
  name = "${var.docker_registry}/docs:${var.build_id}"
}