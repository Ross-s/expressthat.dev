resource "docker_container" "admin" {
    image = docker_image.admin.image_id
    name = "admin"
    ports {
        internal = 3000
        external = 3002
    }
    restart = "always"
}