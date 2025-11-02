# Security Policy

## 🔒 Reporting Security Vulnerabilities

If you discover a security vulnerability, please email the maintainers directly at **[your-email@example.com]** instead of using the public issue tracker.

**Please include:**
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will respond within 48 hours and work on a fix as soon as possible.

## 🛡️ Security Features

### Authentication & Authorization
- [ ] JWT-based authentication (to be implemented)
- [ ] Role-based access control (to be implemented)
- [ ] Password hashing with bcrypt (to be implemented)

### API Security
- ✅ **Rate Limiting**: 100 requests per minute per IP
- ✅ **CORS**: Configured for specific origins only
- ✅ **Helmet.js**: Secure HTTP headers
- ✅ **Input Validation**: All DTOs validated with class-validator
- ✅ **File Upload Restrictions**: Size and type validation

### Data Security
- ✅ **Environment Variables**: All secrets stored in `.env` (never committed)
- ✅ **MongoDB Atlas**: Encrypted connections with TLS/SSL
- ✅ **API Key Protection**: ImageKit keys stored securely
- ✅ **No Sensitive Data Logging**: Error messages sanitized in production

### Infrastructure Security
- ✅ **Docker**: Non-root user, minimal attack surface
- ✅ **Compression**: Reduces bandwidth and DDoS impact
- ✅ **Health Checks**: Automated monitoring

## 🔐 Environment Variables Security

### Critical Variables (Never commit these!)
```env
MONGODB_URI=mongodb+srv://...
IMAGEKIT_PRIVATE_KEY=private_...
```

### Public Variables (Safe to share)
```env
PORT=3001
NODE_ENV=production
CORS_ORIGINS=https://your-frontend.com
```

## 🚨 Security Checklist for Production

### Before Deployment
- [ ] All environment variables set correctly
- [ ] `.env` file NOT committed to Git (check `.gitignore`)
- [ ] MongoDB IP whitelist configured
- [ ] Strong database passwords used
- [ ] CORS origins properly configured
- [ ] HTTPS enabled (SSL/TLS certificate)
- [ ] Rate limiting tested and configured
- [ ] File upload limits tested
- [ ] Error messages don't expose sensitive data
- [ ] Dependencies updated (`npm audit` clean)

### Regular Maintenance
- [ ] Rotate API keys every 90 days
- [ ] Update dependencies monthly
- [ ] Review access logs weekly
- [ ] Monitor rate limiting violations
- [ ] Check MongoDB Atlas security advisories
- [ ] Review CORS configuration quarterly

## 🔧 Security Best Practices

### API Keys
1. **Never** commit API keys to version control
2. Use separate keys for development, staging, and production
3. Rotate keys regularly (every 3-6 months)
4. Monitor key usage in ImageKit dashboard
5. Revoke compromised keys immediately

### MongoDB
1. Use strong, unique passwords (16+ characters)
2. Enable IP whitelist (not 0.0.0.0/0 in production)
3. Use connection string with TLS/SSL
4. Create database users with minimal permissions
5. Enable audit logging in MongoDB Atlas

### File Uploads
1. Always validate file types on server-side
2. Limit file sizes to prevent resource exhaustion
3. Scan uploaded files for malware (if handling user uploads)
4. Store files on CDN (ImageKit), not local filesystem
5. Generate unique filenames to prevent overwrites

### Rate Limiting
```typescript
// Customize per route if needed
@Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 requests per minute
@Post('sensitive-endpoint')
async sensitiveOperation() {
  // ...
}
```

## 📊 Monitoring & Logging

### What to Monitor
- Failed authentication attempts (when implemented)
- Rate limit violations
- File upload errors
- Database connection failures
- Unusual traffic patterns

### What NOT to Log
- ❌ Passwords or authentication tokens
- ❌ API keys or secrets
- ❌ Full MongoDB connection strings
- ❌ User personal data (unless required by law)

## 🆘 Incident Response

### If API Keys are Compromised
1. **Immediately** revoke the compromised keys
2. Generate new keys
3. Update environment variables on all servers
4. Review access logs for unauthorized usage
5. Notify users if data was accessed
6. Document the incident

### If Database is Compromised
1. **Immediately** change database password
2. Update IP whitelist
3. Review database audit logs
4. Restore from backup if necessary
5. Notify affected users
6. Report to authorities if required

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NestJS Security Best Practices](https://docs.nestjs.com/security/helmet)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)
- [ImageKit Security](https://docs.imagekit.io/security)

## 📝 Version History

- **v1.0.0** (Nov 2025) - Initial security implementation
  - Rate limiting
  - Helmet.js
  - Input validation
  - File upload restrictions

---

**Last Updated:** November 2025
