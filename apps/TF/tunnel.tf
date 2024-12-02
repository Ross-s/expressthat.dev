locals {
    secret = base64encode(random_string.secret.result)
}

resource "random_string" "secret" {
    length  = 32
    special = true
}

resource "cloudflare_zero_trust_tunnel_cloudflared" "expressthat-apps" {
  account_id = var.cloudflare_account_id
  name       = "expressthat-apps"
  config_src = "cloudflare"
  secret = local.secret
}

