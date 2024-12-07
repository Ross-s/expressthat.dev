resource "nginxproxymanager_proxy_host" "docs" {
  domain_names            = ["docs.expressthat.dev"]
  forward_scheme          = "http"
  forward_host            = "172.17.0.1"
  forward_port            = 3000
  caching_enabled         = true
  allow_websocket_upgrade = true
  block_exploits          = true
}