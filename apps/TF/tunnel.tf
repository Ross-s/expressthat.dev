resource "cloudflare_zero_trust_tunnel_cloudflared_config" "expressthat_apps_config" {
    account_id = var.cloudflare_account_id
    tunnel_id  = var.cloudflare_tunnel_id
    config {
        
        ingress_rule {
            hostname="test.expressthat.dev"
            service="http://${var.docker_host}:3000"
            path="/"
        }

        ingress_rule {
          service = "http_status:404"
        }
    }
}