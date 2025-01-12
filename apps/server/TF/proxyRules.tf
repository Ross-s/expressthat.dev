resource "nginxproxymanager_proxy_host" "admin" {
  domain_names            = ["app.${var.domain_name}"]
  forward_scheme          = "http"
  forward_host            = var.internal_host
  forward_port            = 3002
  caching_enabled         = true
  allow_websocket_upgrade = true
  block_exploits          = true
}