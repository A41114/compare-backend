# Dùng image Playwright chính thức đã cài Chromium
FROM mcr.microsoft.com/playwright:v1.43.1-focal

# Tạo thư mục ứng dụng và copy mã nguồn vào
WORKDIR /app
COPY . .

# Cài đặt các package của ứng dụng (npm)
RUN npm install

# Kiểm tra và cài đặt dependencies hệ thống nếu cần thiết
RUN apt-get update && apt-get install -y \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Mở port cho Render (Render sẽ dùng PORT env)
EXPOSE 8080

# Start app và sử dụng port từ biến môi trường PORT của Render
CMD ["npm", "start"]
