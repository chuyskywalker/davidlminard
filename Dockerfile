FROM chuyskywalker/centos7-dumbinit-supervisor

COPY docker-files/nginx.repo /etc/yum.repos.d/

RUN yum install -y nginx \
 && yum clean all && rm -rf /var/cache/yum

COPY docker-files/apps.ini    /config/supervisor/apps.ini
COPY docker-files/consul.json /config/consul/service.json
COPY docker-files/nginx.conf  /etc/nginx/nginx.conf

# oooooohhh
COPY dist/ /var/www/
