FROM mcr.microsoft.com/playwright:v1.43.1-jammy

WORKDIR /app
COPY . . 

# Cài đặt các package Node
RUN npm install

# Cài đặt các thư viện hệ thống cần thiết cho Chromium
RUN apt-get update && apt-get install -y \
    libgtk-4-1 \
    libgraphene-1.0-0 \
    libgstgl1.0-0 \
    libgstcodecparsers-1.0-0 \
    libavif15 \
    libenchant-2-2 \
    libsecret-1-0 \
    libmanette-0.2-0 \
    libgles2 \
    libvulkan1 \
    libnss3 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libxcomposite1 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Cài lại trình duyệt của Playwright (chắc chắn nó có mặt)
RUN npx playwright install --with-deps

EXPOSE 8080
CMD ["npm", "start"]
