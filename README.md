# AR Landscape Generator

A simple WebXR AR application that generates procedural landscapes in your real environment using your iPhone's web browser.

## Features

- 🌄 Procedural landscape generation with terrain, trees, and rocks
- 📱 Works on mobile devices with camera access
- 🎮 Interactive - tap to generate new landscapes
- 🌳 Randomized trees, rocks, and ambient elements
- 🎨 Height-based terrain coloring

## How to Use

1. **Local Development**: 
   - Serve the files over HTTPS (required for camera access)
   - Use a local server like `http-server -S` or host on Glitch.com

2. **On Your iPhone**:
   - Open the app in Safari or Chrome
   - Allow camera permissions when prompted
   - Point your camera at a flat surface
   - Tap the screen to generate landscapes

## File Structure

```
webxr-ar-landscape/
├── index.html              # Main HTML file with A-Frame scene
├── landscape-generator.js   # Procedural generation logic
└── README.md               # This file
```

## Technologies Used

- **A-Frame**: Web framework for building VR/AR experiences
- **AR.js**: Augmented reality library for the web
- **WebRTC**: Camera access for AR functionality

## Development Tips

- Test on actual mobile devices for best AR experience
- Use HTTPS for camera access (required by browsers)
- Adjust `terrainSize` and `heightScale` in the code for different landscape sizes
- Modify the `colors` array to change terrain appearance

## Browser Compatibility

- ✅ Chrome/Edge on Android
- ⚠️ Safari on iOS (limited WebXR support)
- ✅ Firefox Reality (VR headsets)

## Next Steps

- Add more landscape types (desert, snow, water)
- Implement landscape persistence
- Add sound effects
- Create multiplayer shared landscapes
- Integrate with location-based AR

## Deployment

Easy deployment options:
- **Glitch**: Upload files and get instant HTTPS hosting
- **GitHub Pages**: Enable HTTPS in repository settings
- **Netlify/Vercel**: Drag and drop deployment

Enjoy creating landscapes in AR! 🌍
