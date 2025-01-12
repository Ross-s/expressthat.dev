resource "docker_container" "admin" {
    image = docker_image.admin.image_id
    name = "admin"
    ports {
        internal = 3000
        external = 3002
    }
    env = [
        "COGNITO_CLIENT_ID=${var.server_cognito_client_id}",
        "COGNITO_CLIENT_SECRET=${var.server_cognito_client_secret}",
        "COGNITO_ISSUER=${var.server_cognito_issuer}",
        "AUTH_SECRET=${var.server_auth_secret}",
        "DATABASE_URL=${var.server_database_url}",
        "AUTH_TRUST_HOST=true",
        "AUTH_URL=https://app.expressthat.dev/api/auth"
        ]
    
    restart = "always"
}

resource "docker_container" "keydb" {
    image = docker_image.keydb.image_id
    name = "keydb"
    ports {
        internal = 6379
        external = 6379
    }
    restart = "always"
}