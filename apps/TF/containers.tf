resource "docker_container" "docs" {
    image = docker_image.docs.image_id
    name = "docs"
    ports {
        internal = 3000
        external = 3000
    }
    restart = "always"
}

resource "docker_container" "example_vue" {
    image = docker_image.example_vue.image_id
    name = "example-vue"
    ports {
        internal = 3000
        external = 3001
    }
    restart = "always"
}

resource "docker_container" "example_svelte" {
    image = docker_image.example_svelte.image_id
    name = "example-svelte"
    ports {
        internal = 3000
        external = 3002
    }
    restart = "always"
}