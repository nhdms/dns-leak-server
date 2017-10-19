# How to implement a server for dnsleaktest

# Prerequisites
  - A linux VPS with free 53 port (DNS standard port)
  - A domain with DNS Management Add Edit or Delete DNS Entries

# Step 1 — Installing the Server Dependencies
  - INFO
    - Server: UBUNTU 17.04
    - Server IP: 1.2.3.4
    - Domain: domain.com
    - Subdomain using for testing: sub.domain.com
  
  - Install nodejs: 
      ```
      curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
      sudo apt-get install -y nodejs
      # https://nodejs.org/en/download/package-manager/
      ```
  - Install nginx 
    ```
    apt install nginx
    ```
  - Install redis-server: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-redis
  - Other tools: 
    ```
    # PM2, run node app
    npm install pm2 -g
    ```
    
# Step 2 - Add A and NS record to DNS Management

Type                Name                Value
 A                  ns1.sub           1.2.3.4           
 NS                 sub               ns1.sub.domain.com
 

  
