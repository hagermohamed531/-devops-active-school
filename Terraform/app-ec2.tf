provider "aws" {
  region = "us-east-2"
}


resource "aws_security_group" "MEAN-APP" {
  name        = "MEAN-APP"
  description = "Allow SSH and Port 80"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
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
    Name = "MEAN-APP"
  }
}


resource "aws_instance" "MEAN-APP" {
  ami                    = "ami-00399ec92321828f5"
  instance_type          = "t2.micro"
  vpc_security_group_ids = [ aws_security_group.MEAN-APP.id ]
  key_name                = "MEAN-APP"  

  tags = {
    Name = "MEAN-APP"
  }
}