locals {
    secret = base64encode(random_string.secret.result)
}

resource "random_string" "secret" {
    length  = 32
    special = true
}

resource "cloudflare_zero_trust_tunnel_cloudflared" "expressthat_apps" {
  account_id = var.cloudflare_account_id
  name       = "expressthat-apps"
  config_src = "cloudflare"
  secret = local.secret
}

resource "cloudflare_zero_trust_tunnel_cloudflared_config" "expressthat_apps_config" {
    account_id = var.cloudflare_account_id
    tunnel_id  = cloudflare_zero_trust_tunnel_cloudflared.expressthat_apps.id
    config {
        
        ingress_rule {
            hostname="test.expressthat.com"
            service="http://${var.docker_host}:3000"
            path="/"
        }
    }
}