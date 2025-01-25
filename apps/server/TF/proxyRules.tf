resource "nginxproxymanager_proxy_host" "admin" {
  domain_names            = ["app.${var.domain_name}"]
  forward_scheme          = "http"
  forward_host            = var.internal_host
  forward_port            = 3002
  caching_enabled         = true
  allow_websocket_upgrade = true
  block_exploits          = true
}

resource "nginxproxymanager_proxy_host" "logto" {
  domain_names            = ["auth.${var.domain_name}"]
  forward_scheme          = "http"
  forward_host            = var.internal_host
  forward_port            = 9001
  caching_enabled         = true
  allow_websocket_upgrade = true
  block_exploits          = true

  location {
    path           = "/"
    forward_scheme = "http"
    forward_host   = var.internal_host
    forward_port   = 9001

    advanced_config = <<EOF
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;
    EOF
  }
}

resource "nginxproxymanager_proxy_host" "logto_admin" {
  domain_names            = ["auth-admin.${var.domain_name}"]
  forward_scheme          = "http"
  forward_host            = var.internal_host
  forward_port            = 9002
  caching_enabled         = true
  allow_websocket_upgrade = true
  block_exploits          = true

  location {
    path           = "/"
    forward_scheme = "http"
    forward_host   = var.internal_host
    forward_port   = 9002

    advanced_config = <<EOF
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;
    EOF
  }
}