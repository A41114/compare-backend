# Dùng image Playwright chính thức đã cài Chromium
FROM mcr.microsoft.com/playwright:v1.43.1-focal

# Tạo thư mục ứng dụng và copy mã nguồn vào
WORKDIR /app
COPY . .

# Cài đặt các package và Playwright dependencies
RUN npm install
RUN npx playwright install --with-deps

# Mở port cho Render (Render sẽ dùng PORT env)
EXPOSE 8080

# Start app
CMD ["npm", "start"]
