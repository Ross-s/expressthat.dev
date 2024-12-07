resource "nginxproxymanager_proxy_host" "docs" {
  domain_names            = ["docs.${var.domain_name}"]
  forward_scheme          = "http"
  forward_host            = var.internal_host
  forward_port            = 3000
  caching_enabled         = true
  allow_websocket_upgrade = true
  block_exploits          = true
}