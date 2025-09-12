# Video Optimization Guide for Portfolio

## Performance Optimizations Implemented

### 1. Lazy Loading ✅
- Videos only load when they enter the viewport
- Uses Intersection Observer API
- Shows placeholder until video is needed

### 2. Preload Strategy ✅
- `preload="metadata"` instead of `preload="auto"`
- Only loads video metadata initially
- Full video loads on user interaction

### 3. Browser Optimizations ✅
- `playsInline` for mobile compatibility
- `muted` by default (required for autoplay)
- Proper video container aspect ratios

## Video File Recommendations

### File Size Guidelines:
- **Maximum per video**: 10MB (ideal: 5MB or less)
- **Total for all 10 videos**: Under 50MB
- **Duration**: Keep reels under 30 seconds

### Compression Settings:
```bash
# Using FFmpeg for optimization:
ffmpeg -i input.mp4 -vcodec h264 -crf 28 -preset medium -vf scale=720:1280 -movflags +faststart output.mp4
```

### Recommended Specs:
- **Resolution**: 720x1280 (720p vertical)
- **Frame Rate**: 30fps
- **Bitrate**: 1-2 Mbps
- **Format**: MP4 (H.264)
- **Audio**: AAC, 128kbps (or remove if not needed)

## Quick Compression Tools:

### Online Tools (Easy):
1. **HandBrake** (Free desktop app)
   - Preset: "Web" or "Fast 720p30"
   - RF: 22-28 (higher = smaller file)

2. **CloudConvert** (Online)
   - Upload → MP4 → Quality: 70-80%

3. **Clipchamp** (Online/Windows)
   - Export quality: 720p

### Professional Tools:
- **Adobe Media Encoder**: "Match Source - High bitrate" then adjust
- **DaVinci Resolve**: Free, professional-grade
- **Final Cut Pro**: "Share → Master File" with custom settings

## Performance Monitoring:

### Check Your Site Speed:
1. **Before adding videos**: Run PageSpeed Insights
2. **After adding videos**: Compare the scores
3. **Target**: Keep Lighthouse score above 90

### Load Testing:
- Test on slow 3G connection
- Check mobile performance
- Monitor network tab in DevTools

## Additional Optimizations:

### Future Improvements:
- Consider WebM format for better compression
- Add video thumbnails for faster initial load
- Implement progressive loading
- Use CDN for video delivery

### Bundle Size Impact:
- Videos are separate from JavaScript bundle
- No impact on initial page load time
- Only load when user visits Portfolio tab

## File Structure:
```
public/
├── videos/
│   ├── reel1.mp4 (< 5MB each)
│   ├── reel2.mp4
│   └── ... (10 total)
```

## Quick Check:
Before deploying, ensure:
- [ ] Each video file is under 10MB
- [ ] All videos play correctly in browser
- [ ] Page loads quickly on slow connection
- [ ] Mobile experience is smooth
