# ---------- STEP 1: Build Frontend ----------
FROM node:18-alpine AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json（或 yarn.lock）
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制前端源代码
COPY . .

# 构建生产包
RUN npm run build

# ---------- STEP 2: Serve with Nginx ----------
FROM nginx:alpine

# 删除默认 Nginx 网站文件（可选）
RUN rm -rf /usr/share/nginx/html/*

# 将 dist 文件夹复制到 Nginx 默认目录
COPY --from=build /app/dist /usr/share/nginx/html

# 复制自定义 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]