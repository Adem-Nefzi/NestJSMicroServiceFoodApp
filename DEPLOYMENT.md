# Production Deployment Guide

## 🔐 Security Checklist

### 1. Environment Variables
- ✅ **NEVER** commit `.env` file to version control
- ✅ Use `.env.example` as a template
- ✅ Set `NODE_ENV=production` in production
- ✅ Use strong, unique credentials for MongoDB
- ✅ Rotate API keys periodically

### 2. API Keys & Secrets
All sensitive data is stored in environment variables:
- `MONGODB_URI` - MongoDB Atlas connection string
- `IMAGEKIT_PUBLIC_KEY` - ImageKit public key
- `IMAGEKIT_PRIVATE_KEY` - ImageKit private key (keep secret!)
- `IMAGEKIT_URL_ENDPOINT` - ImageKit URL endpoint

### 3. Security Features Implemented
- ✅ **Helmet.js** - Secures HTTP headers
- ✅ **Rate Limiting** - Prevents abuse (100 requests/minute by default)
- ✅ **CORS** - Configured for specific origins only
- ✅ **Input Validation** - All DTOs are validated
- ✅ **Compression** - Reduces response sizes
- ✅ **File Upload Restrictions** - Max 5MB, specific file types only

## 🚀 Deployment Steps

### Local Development
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your actual credentials
# Install dependencies
npm install

# Run in development mode
npm run start:dev
```

### Production Deployment

#### Option 1: Traditional Server (VPS, AWS EC2, etc.)
```bash
# Build the application
npm run build

# Set environment variables on your server
export NODE_ENV=production
export MONGODB_URI="your_mongodb_uri"
export IMAGEKIT_PUBLIC_KEY="your_key"
export IMAGEKIT_PRIVATE_KEY="your_private_key"
export IMAGEKIT_URL_ENDPOINT="your_endpoint"
export PORT=3001

# Start the application
npm run start:prod
```

#### Option 2: Docker
```dockerfile
# Create a Dockerfile (example provided below)
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
```

```bash
# Build and run with Docker
docker build -t nest-food-app .
docker run -p 3001:3001 --env-file .env nest-food-app
```

#### Option 3: Platform as a Service (Heroku, Railway, Render, etc.)

**Heroku:**
```bash
# Install Heroku CLI
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI="your_mongodb_uri"
heroku config:set IMAGEKIT_PUBLIC_KEY="your_key"
heroku config:set IMAGEKIT_PRIVATE_KEY="your_private_key"
heroku config:set IMAGEKIT_URL_ENDPOINT="your_endpoint"

# Deploy
git push heroku main
```

**Railway/Render:**
- Connect your GitHub repository
- Add environment variables in the dashboard
- Deploy automatically on push

## 📝 Environment Variables Setup

### Required Variables
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/database
PORT=3001
IMAGEKIT_PUBLIC_KEY=public_xxxxx
IMAGEKIT_PRIVATE_KEY=private_xxxxx
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id/
```

### Optional Variables
```env
# CORS (comma-separated)
CORS_ORIGINS=https://your-frontend.com,https://www.your-frontend.com

# Rate Limiting
RATE_LIMIT_TTL=60000
RATE_LIMIT_MAX=100

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp
```

## 🔧 MongoDB Atlas Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user with password
3. Whitelist your server's IP address (or 0.0.0.0/0 for development)
4. Get your connection string from "Connect" → "Connect your application"
5. Replace `<username>`, `<password>`, and `<database>` in the connection string

## 🖼️ ImageKit.io Setup

1. Sign up at [ImageKit.io](https://imagekit.io/registration)
2. Get your credentials from [Dashboard → Developer → API Keys](https://imagekit.io/dashboard/developer/api-keys)
3. Copy:
   - Public Key
   - Private Key (keep this secret!)
   - URL Endpoint

## 🔒 Security Best Practices

### DO:
- ✅ Use environment variables for all secrets
- ✅ Enable HTTPS in production (use SSL/TLS certificates)
- ✅ Keep dependencies updated (`npm audit` regularly)
- ✅ Use a process manager (PM2) for production
- ✅ Set up monitoring and logging
- ✅ Configure firewall rules
- ✅ Use MongoDB IP whitelist
- ✅ Rotate credentials periodically

### DON'T:
- ❌ Commit `.env` file to Git
- ❌ Share API keys in public repositories
- ❌ Use default ports without firewall
- ❌ Run as root user
- ❌ Expose error stack traces in production
- ❌ Allow unlimited file uploads

## 🚨 Production Monitoring

### Using PM2 (Process Manager)
```bash
# Install PM2 globally
npm install -g pm2

# Start application with PM2
pm2 start dist/main.js --name nest-food-app

# View logs
pm2 logs nest-food-app

# Restart
pm2 restart nest-food-app

# Auto-restart on server reboot
pm2 startup
pm2 save
```

## 📊 Health Check Endpoint

Access `http://your-domain.com:3001/` to verify the app is running.

## 🐛 Troubleshooting

### Application won't start
- Check all environment variables are set correctly
- Verify MongoDB connection string is valid
- Check port is not already in use
- Review logs for specific error messages

### Rate limiting issues
- Adjust `RATE_LIMIT_MAX` and `RATE_LIMIT_TTL` in `.env`
- Consider implementing IP-based rate limiting

### Image upload fails
- Verify ImageKit credentials are correct
- Check file size and type restrictions
- Ensure ImageKit account has available storage

## 📚 Additional Resources

- [NestJS Production Best Practices](https://docs.nestjs.com/techniques/performance)
- [MongoDB Atlas Security](https://docs.atlas.mongodb.com/security/)
- [ImageKit.io Documentation](https://docs.imagekit.io/)

---

**Last Updated:** November 2025
