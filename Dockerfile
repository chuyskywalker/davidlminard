FROM nginx
COPY docker-files/nginx.conf  /etc/nginx/nginx.conf
COPY dist/ /var/www/
