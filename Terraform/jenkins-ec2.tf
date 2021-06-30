provider "aws" {
  region = "us-east-2"
}


resource "aws_security_group" "Jenkins" {
  name        = "Jenkins"
  description = "Allow SSH and Port 8080"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] 
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1" # means all protocols
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Jenkins"
  }
}


resource "aws_instance" "Jenkins" {
  ami                    = "ami-01e36b7901e884a10"
  instance_type          = "t2.micro"
  vpc_security_group_ids = [ aws_security_group.Jenkins.id ]
  key_name                = "Jenkins"  

  tags = {
    Name = "Jenkins"
  }
}