resource "docker_container" "admin" {
    image = docker_image.admin.image_id
    name = "admin"
    ports {
        internal = 3000
        external = 3002
    }
    env = {
        COGNITO_CLIENT_ID=var.server_cognito_client_id
        COGNITO_CLIENT_SECRET=var.server_cognito_client_secret
        COGNITO_ISSUER=var.server_cognito_issuer
        AUTH_SECRET=var.server_auth_secret
        DATABASE_URL=var.database_url
    }
    restart = "always"
}