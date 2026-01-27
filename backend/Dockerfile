FROM almalinux:10-minimal

# -----------------------------
# Environment
# -----------------------------
ENV NODE_ENV=production

# -----------------------------
# Install system dependencies + NGINX
# -----------------------------
RUN microdnf install -y \
    curl \
    ca-certificates \
    shadow-utils \
    nginx \
    mariadb \
 && microdnf clean all

# -----------------------------
# Install Node.js 20
# -----------------------------
RUN curl -fsSL https://rpm.nodesource.com/setup_20.x | bash - \
 && microdnf install -y nodejs \
 && microdnf clean all

# Verify installation
RUN node -v && npm -v && nginx -v

# -----------------------------
# App directory
# -----------------------------
WORKDIR /app

# -----------------------------
# Copy application
# -----------------------------
COPY . .

# -----------------------------
# Node dependencies
# -----------------------------
RUN npm install -g pm2 \
 && npm install mariadb \
 && npm install --production

# -----------------------------
# NGINX config
# -----------------------------
#RUN rm -f /etc/nginx/nginx.conf

#COPY nginx/nginx.conf /etc/nginx/nginx.conf
#COPY nginx/api.lms.local.conf /etc/nginx/conf.d/api.lms.local.conf

# -----------------------------
# Expose ports
# -----------------------------
EXPOSE  7007

# -----------------------------
# Start NGINX + Node
# -----------------------------
CMD ["sh", "-c", "sleep 15 && node migrate.mjs && pm2 start src/server.js --name lms && nginx -g 'daemon off;'"]

