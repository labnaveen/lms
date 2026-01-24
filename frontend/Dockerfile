FROM almalinux:10-minimal


# -----------------------------
# Install system dependencies + NGINX
# -----------------------------
RUN microdnf install -y \
    curl \
    ca-certificates \
    shadow-utils \
    nginx \
 && microdnf clean all


# Verify installation
RUN  nginx -v
#------------------------------
# NGINX config
# -----------------------------
# Remove default config
RUN rm -f /etc/nginx/conf.d/*

# Copy frontend build
COPY dist /usr/share/nginx/html

# Copy nginx server config
COPY nginx/lms-frontend.local.conf /etc/nginx/conf.d/lms-frontend.conf

# -----------------------------
# Expose ports
# -----------------------------
EXPOSE  80

# -----------------------------
# Start NGINX + Node
# -----------------------------
CMD ["sh", "-c", "sleep 15 &&  nginx -g 'daemon off;'"]

