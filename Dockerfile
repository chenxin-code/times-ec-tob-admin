#FROM nginx:1.15.2-alpine
FROM 10.1.245.66:31104/times-linli/nginx:1.15.2-alpinejianshu
COPY ./dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf