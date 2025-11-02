# ImageKit.io Setup Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Free ImageKit Account

1. Go to: https://imagekit.io/registration
2. Sign up with your email (no credit card required)
3. Verify your email
4. **Free tier includes**: 20 GB storage + 20 GB bandwidth/month

### Step 2: Get Your API Credentials

1. After login, go to: https://imagekit.io/dashboard/developer/api-keys
2. You'll see three values:
   - **URL Endpoint**: `https://ik.imagekit.io/your_imagekit_id`
   - **Public Key**: `public_xxxxxxxxxxxxx`
   - **Private Key**: `private_xxxxxxxxxxxxx`

### Step 3: Configure Your .env File

Open `.env` and replace the placeholder values:

```env
IMAGEKIT_PUBLIC_KEY=public_xxxxxxxxxxxxx
IMAGEKIT_PRIVATE_KEY=private_xxxxxxxxxxxxx
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

### Step 4: Start Your App

```bash
npm run start:dev
```

## 📤 How to Upload Images

### Using Postman/Thunder Client:

**Endpoint**: `POST http://localhost:3001/upload/recipe-image`

**Headers**:

- `Content-Type: multipart/form-data`

**Body** (form-data):

- Key: `image` (type: File)
- Value: Select your image file

**Response**:

```json
{
  "imageUrl": "https://ik.imagekit.io/your_imagekit_id/recipes/1730467200000_chicken-biryani.jpg"
}
```

### Using cURL:

```bash
curl -X POST http://localhost:3001/upload/recipe-image \
  -F "image=@path/to/your/image.jpg"
```

## 🎨 Image Optimization Features

ImageKit automatically:

- ✅ Compresses images (reduces size by 60-80%)
- ✅ Converts to WebP for modern browsers
- ✅ Serves from global CDN (faster worldwide)
- ✅ Provides responsive image URLs

### Example Transformations:

**Original URL**:

```
https://ik.imagekit.io/your_id/recipes/image.jpg
```

**Thumbnail (400x300)**:

```
https://ik.imagekit.io/your_id/tr:w-400,h-300,f-auto,q-80/recipes/image.jpg
```

**Large Display (800x600)**:

```
https://ik.imagekit.io/your_id/tr:w-800,h-600,f-auto,q-80/recipes/image.jpg
```

## 📝 Creating a Recipe with Uploaded Image

### Step 1: Upload Image

```bash
POST /upload/recipe-image
(Upload your image, get URL back)
```

### Step 2: Create Recipe

```bash
POST /recipes
{
  "title": "Chicken Biryani",
  "description": "Delicious layered rice dish",
  "imageUrl": "https://ik.imagekit.io/your_id/recipes/1730467200000_chicken-biryani.jpg",
  "ingredients": ["2 cups rice", "1 kg chicken", ...],
  "steps": ["Marinate chicken", "Cook rice", ...],
  "category": "main-course",
  "prepTime": 30,
  "cookTime": 45,
  "difficulty": "medium",
  "userId": "user123"
}
```

## ⚙️ Configuration Options

### File Validation

Current limits (can be changed in `upload.controller.ts`):

- **Max file size**: 5 MB
- **Allowed formats**: JPEG, JPG, PNG, WebP
- **Upload folder**: `recipes/`

### Modify Validation:

```typescript
// In src/presentation/controllers/upload.controller.ts

// Change max size (e.g., 10MB)
const maxSize = 10 * 1024 * 1024;

// Add more formats
const allowedMimeTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif', // Add GIF support
];
```

## 🔒 Security Best Practices

1. ✅ **Never commit .env file** - Already in `.gitignore`
2. ✅ **Keep private key secret** - Don't expose in frontend
3. ✅ **Validate file types** - Already implemented
4. ✅ **Limit file sizes** - Already implemented
5. ⚠️ **Add authentication** - Recommended for production

## 📊 Monitoring Usage

1. Go to: https://imagekit.io/dashboard
2. View:
   - Storage used
   - Bandwidth consumed
   - Number of requests
   - Most viewed images

## 🆙 Upgrading (If Needed Later)

**Free Tier**: 20 GB storage + 20 GB bandwidth/month (FREE forever)

**Paid Plans** (only if you outgrow free tier):

- **Starter**: $29/month - 40 GB storage + 40 GB bandwidth
- **Growth**: $99/month - 100 GB storage + 100 GB bandwidth

**For 1,000 recipes**: Free tier is more than enough!

## 🐛 Troubleshooting

### Error: "Failed to upload image"

- ✅ Check your API credentials in `.env`
- ✅ Verify URL endpoint has no trailing slash
- ✅ Ensure internet connection is working

### Error: "Invalid file type"

- ✅ Only JPEG, PNG, WebP allowed
- ✅ Check file extension matches content

### Error: "File size exceeds limit"

- ✅ Max 5MB per image
- ✅ Compress image before uploading

## 📚 Additional Resources

- **ImageKit Docs**: https://docs.imagekit.io/
- **API Reference**: https://docs.imagekit.io/api-reference/
- **Transformation Docs**: https://docs.imagekit.io/features/image-transformations

## ✅ What's Been Implemented

1. ✅ ImageKit service for upload/delete/optimize
2. ✅ Upload controller with validation
3. ✅ Upload module integrated into app
4. ✅ File type validation (JPEG, PNG, WebP)
5. ✅ File size validation (5MB max)
6. ✅ Environment configuration
7. ✅ Error handling
8. ✅ Clean architecture structure

Your recipe images are now optimized, CDN-delivered, and stored for free! 🎉
