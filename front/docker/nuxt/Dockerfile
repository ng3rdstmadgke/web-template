FROM node:lts-bullseye

# ENV http_proxy http://xxxxxxx.jp:7080
# ENV https_proxy http://xxxxxxx.jp:7080
# ENV NO_PROXY 169.254.169.254,169.254.170.2

RUN apt update && \
    apt install -y iputils-ping net-tools

RUN apt install locales -y && \
    echo 'ja_JP.UTF-8 UTF-8' >> /etc/locale.gen && \
    locale-gen && \
    update-locale LANG=ja_JP.UTF-8

RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . .
RUN npm run build
COPY docker/nuxt/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
CMD ["/usr/local/bin/entrypoint.sh"]