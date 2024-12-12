resource "nginxproxymanager_proxy_host" "docs" {
  domain_names            = ["docs.${var.domain_name}"]
  forward_scheme          = "http"
  forward_host            = var.internal_host
  forward_port            = 3000
  caching_enabled         = true
  allow_websocket_upgrade = true
  block_exploits          = true
}

resource "nginxproxymanager_proxy_host" "example_vue" {
  domain_names            = ["example-vue.${var.domain_name}"]
  forward_scheme          = "http"
  forward_host            = var.internal_host
  forward_port            = 3001
  caching_enabled         = true
  allow_websocket_upgrade = true
  block_exploits          = true
}

resource "nginxproxymanager_proxy_host" "example_svelte" {
  domain_names            = ["example-svelte.${var.domain_name}"]
  forward_scheme          = "http"
  forward_host            = var.internal_host
  forward_port            = 3002
  caching_enabled         = true
  allow_websocket_upgrade = true
  block_exploits          = true
}