resource "docker_image" "docs" {
    name = "${replace(var.docker_registry, "http://", "")}/docs:${var.build_id}"
}

resource "docker_image" "example_vue" {
  name = "${replace(var.docker_registry, "http://", "")}/example-vue:${var.build_id}"
}