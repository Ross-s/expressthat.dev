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
        "AUTH_URL=https://app.expressthat.dev/api/auth",
        "REDIS_IP=${var.server_redis_ip}"
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

resource "docker_container" "postgres" {
    image = docker_image.postgres.image_id
    name = "postgres"
    
    ports {
        internal = 5432
        external = 5432
    }

    env = [
        "POSTGRES_USER=${var.server_postgres_user}",
        "POSTGRES_PASSWORD=${var.server_postgres_password}",
        "PGDATA=/var/lib/postgresql/data/pgdata"
    ]

    volumes {
        volume_name = docker_volume.postgres_data.name
        container_path  = "/var/lib/postgresql/data"
    }
    restart = "always"
}

resource "docker_container" "logto" {
    image = docker_image.logto.image_id
    name = "logto"
    ports {
        internal = 3001
        external = 9001
    }

    ports {
        internal = 3002
        external = 9002
    }
    env = [
        "TRUST_PROXY_HEADER=1",
        "DB_URL=postgres://${var.server_postgres_user}:${var.server_postgres_password}@postgres:5432/logto",
    ]
    entrypoint = ["sh", "-c", "npm run cli db seed -- --swe && npm start"]
    restart = "always"
}