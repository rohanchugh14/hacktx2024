# Create an S3 bucket for static website hosting
resource "aws_s3_bucket" "reactbucket" {
    bucket = "fiscalfootprint.tech"
    tags = {
        "env" = "dev"
    }
}

resource "aws_s3_bucket_website_configuration" "react-config" {
    bucket = aws_s3_bucket.reactbucket.id

    index_document {
        suffix = "index.html"
    }
}

resource "aws_s3_bucket_ownership_controls" "bucket-ownership" {
    bucket = aws_s3_bucket.reactbucket.id

    rule {
        object_ownership = "BucketOwnerPreferred"
    }
}

resource "aws_s3_bucket_public_access_block" "bucket-public-access" {
    bucket = aws_s3_bucket.reactbucket.id
    block_public_acls = false
    block_public_policy = false
    ignore_public_acls = false
    restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "bucket-acl" {
    bucket = aws_s3_bucket.reactbucket.id
    acl = "public-read"

    depends_on = [ aws_s3_bucket_ownership_controls.bucket-ownership, aws_s3_bucket_public_access_block.bucket-public-access ]
}

resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.reactbucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.reactbucket.arn}/*"
      },
    ]
  })
}