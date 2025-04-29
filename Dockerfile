# Dùng Playwright image Ubuntu 22.04 (jammy)
FROM mcr.microsoft.com/playwright:v1.43.1-jammy

WORKDIR /app
COPY . .

# Cài Node packages
RUN npm install

# (Không cần install deps thủ công nữa!)
# Playwright image này đã tích hợp hầu hết dependencies

# Nhưng bạn vẫn có thể chắc chắn bằng:
RUN npx playwright install --with-deps

EXPOSE 8080
CMD ["npm", "start"]
