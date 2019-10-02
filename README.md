# How to implement a server for dnsleaktest

* Replace all domain name, ip...
# Prerequisites
  - A linux VPS with free 53 port (DNS standard port)
  - A domain with DNS Management Add Edit or Delete DNS Entries

# Step 1 — Installing the Server Dependencies
  - INFO
    - Server: UBUNTU 17.04
    - Server IP: 1.2.3.4
    - Domain: domain.com
    - Subdomain using for testing: sub.domain.com
  - Change to root user
    ```
    sudo -i
    ```

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
  - Set hostname 
    ```
    hostnamectl set-hostname ns1
    ```
 - Edit hosts file
   - add this line to end of file ``` 1.2.3.4 ns1.sub.domain.com ns1 ```
   ```
    nano /etc/hosts
   ```
    
# Step 2 - Add A and NS record to DNS Management

Type         |       Name         |       Value
---         |       ----          |     ---
 A           |       ns1.sub       |    1.2.3.4   
 NS           |      sub            |   ns1.sub.domain.com
 

# Step 3 - Config nginx to handle all subdomain ends with "sub.domain.com"
  - Create config file */etc/nginx/sites-enabled/sub.domain.com*
    ```
    # nano /etc/nginx/sites-enabled/sub.domain.com
    server {
      listen 80;
      listen [::]:80;
      root /var/www/html;
      index index.html index.htm index.nginx-debian.html;

      server_name ~^(.*)\.sub\.domain\.com$;

      location / {
            proxy_pass http://localhost:8080;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```
    - Change *server_name* and *proxy_pass*
      - proxy_pass is address of your http server instance, this server handler all wildcard domain
    - Restart nginx ``` service nginx restart ```
    
    
 # Step 4 - Run custom dns server and http server 
    - Create (remember to change domain in these file):
      - dns_server.js file: [custom_dns_server.js](https://github.com/nhdms/dns-leak-server/blob/master/custom_dns_server.js)
      - http_server.js file: [http_server](https://github.com/nhdms/dns-leak-server/blob/master/httpserver.js)
     - Start app (Using PM2)
      ```
      pm2 start dns_server.js
      pm2 start http_server.js
      ```
# Step 5 - Test
   - Send request to this address http://*unique_string*.sub.domain.com
   * Get all DNS server IP: [XHR](https://github.com/nhdms/dns-leak-server/blob/master/xhr-test.js)
    
  
  
