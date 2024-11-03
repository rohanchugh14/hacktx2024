# Create a Route 53 record for the root domain (example.com)
resource "aws_route53_record" "domain_root" {
  zone_id = var.hosted_zone_id
  name    = "fiscalfootprint.tech"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.react_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.react_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

# Optionally create a Route 53 record for the www subdomain
resource "aws_route53_record" "www" {
  zone_id = var.hosted_zone_id
  name    = "www.fiscalfootprint.tech"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.react_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.react_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
