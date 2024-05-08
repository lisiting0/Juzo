FROM registry-vpc.cn-beijing.aliyuncs.com/yuxiang-mirror/nginx:1.24.0-alpine AS base
COPY ["./nginx/nginx.conf","/etc/nginx/nginx.conf"]
COPY ["./nginx/conf.d/default.conf","/etc/nginx/conf.d/default.conf"]
WORKDIR /usr/share/nginx/html
COPY ./dist/ .

EXPOSE 8080
