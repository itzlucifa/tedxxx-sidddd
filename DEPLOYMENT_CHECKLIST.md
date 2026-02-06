# 🚀 Deployment Checklist for TEDx Theme Hunt

## ✅ VIDEO BACKGROUND SETUP - CRITICAL!

### Current Video Path in Code:
```
/sam vedio/Crazy_Photo_Animation_for_Website.mp4
```

### For Video to Work on Deployed Website:

#### 1. **UPLOAD STRUCTURE** (Must match exactly):
```
your-website.com/
├── index.html
├── assets/
│   ├── index-DG08zN9O.css
│   └── index-5sqvXok_.js
└── sam vedio/
    └── Crazy_Photo_Animation_for_Website.mp4
```

#### 2. **IMPORTANT**: 
- The folder name `sam vedio` must be uploaded EXACTLY as shown
- Video file name must be EXACT: `Crazy_Photo_Animation_for_Website.mp4`
- Path is case-sensitive on most servers

#### 3. **TEST VIDEO URL AFTER DEPLOYMENT**:
Visit: `https://your-domain.com/sam%20vedio/Crazy_Photo_Animation_for_Website.mp4`
- Should play the video directly in browser
- If 404 error, video path is wrong

#### 4. **COMMON ISSUES & FIXES**:

**Issue**: Video not playing
**Fix**: Ensure `sam vedio` folder is at root level

**Issue**: 404 error for video
**Fix**: Check exact folder name and file name spelling

**Issue**: Video loads but doesn't autoplay
**Fix**: Most browsers block autoplay - this is normal behavior

## 📁 FILES TO UPLOAD:
- ✅ Entire `dist` folder contents
- ✅ `sam vedio/` folder (must be at root level)

## 🎯 VIDEO WILL WORK IF:
1. Folder structure matches exactly
2. Video file is accessible via direct URL
3. No server blocking of video files

## 🔧 TROUBLESHOOTING:
If video doesn't work:
1. Check browser console for 404 errors
2. Test video URL directly
3. Verify folder names match exactly
