# 🚀 UAE Winter Tales - Docker Deployment Guide

Complete guide for deploying the Comic Book Generator to your VPS using Docker.

## 📋 Prerequisites

- VPS with Docker and Docker Compose installed
- Domain name pointing to your VPS IP (optional but recommended)
- OpenAI API key

## 🔧 Pre-Deployment Setup

### 1. Update Next.js Configuration

Add to `next.config.js`:
```javascript
module.exports = {
  output: 'standalone',  // Enable for Docker
  // ... rest of your config
}
```

### 2. Configure Environment Variables

Create `.env.local` on your VPS:
```bash
OPENAI_API_KEY=your_actual_openai_api_key_here
NODE_ENV=production
```

## 📦 Deployment Steps

### Option A: Direct Deployment (Recommended)

**1. Upload Project to VPS**
```bash
# On your local machine
cd /Users/42ad/Desktop/commic-book
tar -czf comic-book.tar.gz --exclude=node_modules --exclude=.next --exclude=.git .

# Upload to VPS (replace with your VPS details)
scp comic-book.tar.gz user@your-vps-ip:/home/user/
```

**2. On Your VPS**
```bash
# Extract files
mkdir -p ~/comic-book-app
cd ~/comic-book-app
tar -xzf ../comic-book.tar.gz

# Create .env.local file
nano .env.local
# Add: OPENAI_API_KEY=your_key_here

# Build and start
docker-compose up -d --build
```

### Option B: With Nginx (Production)

**1. Update nginx.conf**
```bash
# Edit nginx.conf and replace 'your-domain.com' with your actual domain
nano nginx.conf
```

**2. Start all services**
```bash
docker-compose up -d --build
```

**3. For SSL (Let's Encrypt)**
```bash
# Install certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Copy certificates to project
mkdir -p ssl
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem ssl/
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem ssl/

# Uncomment HTTPS server block in nginx.conf
nano nginx.conf

# Restart nginx
docker-compose restart nginx
```

## 🎯 Quick Commands

### Start Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f comic-generator
```

### Rebuild After Code Changes
```bash
docker-compose down
docker-compose up -d --build
```

### Check Status
```bash
docker-compose ps
```

## 🔍 Troubleshooting

### App Won't Start
```bash
# Check logs
docker-compose logs comic-generator

# Common issue: Check .env.local exists
ls -la .env.local

# Verify API key is set
docker-compose exec comic-generator env | grep OPENAI
```

### Build Errors
```bash
# Clean everything and rebuild
docker-compose down -v
docker system prune -a
docker-compose up -d --build
```

### Port Already in Use
```bash
# Find what's using port 3000
sudo lsof -i :3000

# Change port in docker-compose.yml
# ports: - "8080:3000"  # Use 8080 instead
```

## 📊 Monitoring

### Check Application Health
```bash
curl http://localhost:3000/api/generate
```

### Monitor Resource Usage
```bash
docker stats
```

##  🔒 Security Checklist

- [ ] Change default ports if needed
- [ ] Set up firewall rules (UFW recommended)
- [ ] Use SSL/HTTPS in production
- [ ] Keep API keys in .env.local (never commit)
- [ ] Regular security updates: `sudo apt update && sudo apt upgrade`
- [ ] Set up automatic backups

## 🔄 Updates & Maintenance

### Update Application
```bash
cd ~/comic-book-app
git pull  # If using git
# Or upload new files

docker-compose down
docker-compose up -d --build
```

### Backup Data
```bash
# Backup environment and configs
tar -czf backup-$(date +%Y%m%d).tar.gz .env.local docker-compose.yml nginx.conf
```

## 🌐 Accessing Your App

- **Without Nginx**: http://your-vps-ip:3000
- **With Nginx (HTTP)**: http://your-domain.com
- **With Nginx (HTTPS)**: https://your-domain.com

## 📱 Testing

After deployment, test:
1. Visit homepage
2. Generate a comic
3. Download PDF
4. Check all 6 value categories work

## ⚡ Performance Tips

1. **Enable caching** in nginx for static assets
2. **Use CDN** for generated images (optional)
3. **Monitor API usage** to manage OpenAI costs
4. **Set rate limits** in nginx.conf (already configured)

## 🆘 Need Help?

Common URLs:
- App: `http://localhost:3000`
- API Health: `http://localhost:3000/api/generate` (GET request)
- Nginx Health: `http://localhost/health`

## 📝 Configuration Files Summary

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage production build |
| `docker-compose.yml` | Service orchestration |
| `.dockerignore` | Exclude files from build |
| `nginx.conf` | Reverse proxy & SSL |
| `.env.local` | Environment variables |

---

**🎉 Your comic book generator is now running in production!**
