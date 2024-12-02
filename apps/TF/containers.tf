resource "docker_container" "docs" {
    image = docker_image.docs.image_id
    name = "docs"
    ports {
        internal = 3000
        external = 3000
    }
    restart = "always"
}