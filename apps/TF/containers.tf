resource "docker_container" "docs" {
    image = docker_image.docs.image_id
    name = "docs"
    ports {
        internal = 3000
        external = 3000
    }
    restart = "always"
}

resource "docker_container" "cloudflared" {
    image = docker_image.cloudflared.image_id
    name = "cloudflared"
    restart = "always"
    command = ["tunnel", "--no-autoupdate", "run", "--token", var.cloudflare_tunnel_secret]
}