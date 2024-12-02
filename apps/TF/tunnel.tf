resource "cloudflare_zero_trust_tunnel_cloudflared" "expressthat-apps" {
  account_id = var.cloudflare_account_id
  name       = "expressthat-apps"
  config_src = "cloudflare"
  secret = ""
}

