# Dùng image Playwright chính thức đã cài Chromium
FROM mcr.microsoft.com/playwright:v1.43.1-focal

# Tạo thư mục ứng dụng và copy mã nguồn vào
WORKDIR /app
COPY . .

# Cài đặt các package của ứng dụng
RUN npm install

# Cài đặt trình duyệt và dependencies của Playwright (nếu chưa cài)
RUN npx playwright install --with-deps

# Kiểm tra xem Playwright đã được cài đặt chính xác chưa
RUN npx playwright --version

# Mở port cho Render
EXPOSE 8080

# Start app
CMD ["npm", "start"]
