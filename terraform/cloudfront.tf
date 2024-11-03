# Create a CloudFront distribution for the S3 bucket
resource "aws_cloudfront_distribution" "react_distribution" {
  origin {
    domain_name = "${aws_s3_bucket.reactbucket.bucket}.s3-website-us-east-1.amazonaws.com"
    origin_id   = "S3-${aws_s3_bucket.reactbucket.bucket}"

    # Optional: Use S3 origin access identity for better security
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.s3_identity.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  # Default cache behavior settings
  default_cache_behavior {
    target_origin_id = "S3-${aws_s3_bucket.reactbucket.bucket}"
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  # Viewer certificate configuration
  viewer_certificate {
    cloudfront_default_certificate = true
  }

  # Restrictions block (optional for specifying geographic restrictions)
  restrictions {
    geo_restriction {
      restriction_type = "none" # Use "none" if you don't want to restrict by geography
    }
  }

  tags = {
    "env" = "dev"
  }
}

# Optional: Create an origin access identity for secure access to the S3 bucket
resource "aws_cloudfront_origin_access_identity" "s3_identity" {
  comment = "Access identity for CloudFront to S3 bucket"
}


