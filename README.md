# AR Landscape Generator

A collection of different AR approaches for generating procedural landscapes, showcasing various WebXR and AR technologies.

## 🚀 Live Demos

| Version | Best For | Technology | URL |
|---------|----------|------------|-----|
| **🍎 Quick Look** | iPhone Safari | Apple AR Quick Look | [quick-look.html](https://jonymorse.github.io/ar-landscape/quick-look.html) |
| **🔒 Enhanced Markers** | Desktop/Android | AR.js + Locking | [locked-shapes.html](https://jonymorse.github.io/ar-landscape/locked-shapes.html) |
| **🎲 Basic Shapes** | Quick Testing | AR.js Markers | [shape-test.html](https://jonymorse.github.io/ar-landscape/shape-test.html) |
| **🌄 Landscape Markers** | Full Landscapes | AR.js Procedural | [marker-index.html](https://jonymorse.github.io/ar-landscape/marker-index.html) |
| **📱 Original AR** | Camera Overlay | AR.js Hit Testing | [index.html](https://jonymorse.github.io/ar-landscape/) |

## 📱 Platform Compatibility

### iPhone Safari (Recommended: Quick Look)
- ✅ **AR Quick Look** - Perfect native AR experience
- ⚠️ **AR.js Markers** - Limited but functional
- ❌ **WebXR Hit Testing** - Not supported

### Android Chrome
- ✅ **WebXR Hit Testing** - Full surface detection
- ✅ **AR.js Markers** - Excellent tracking
- ❌ **AR Quick Look** - iOS only

### Desktop Browser
- ✅ **AR.js Markers** - Great for testing with webcam
- ✅ **Enhanced Locking** - Perfect for development
- ❌ **Mobile AR features** - Limited

## 🍎 AR Quick Look Implementation

The **Quick Look version** uses Apple's native AR system:

### Features:
- **📱 Native iOS integration** - Built into Safari
- **🎯 Automatic surface detection** - No manual hit testing
- **📦 USDZ file format** - Apple's optimized 3D format
- **🔗 Simple implementation** - Just `<a href="file.usdz" rel="ar">`
- **⚡ Professional experience** - Same as Apple's own AR apps

### How it Works:
```html
<!-- Simple AR Quick Look link -->
<a href="landscape.usdz" rel="ar">
    📱 View in AR
</a>
```

### Advantages:
- ✅ **Most reliable** on iPhone
- ✅ **No permissions needed**
- ✅ **Professional UI**
- ✅ **Offline capable**
- ✅ **Share/save functionality**

### Limitations:
- ❌ **iOS Safari only**
- ❌ **Static models** (no real-time generation)
- ❌ **USDZ format required**
- ❌ **No dynamic content**

## 🎯 AR.js Marker System

The **marker-based versions** use computer vision tracking:

### Features:
- **🖨️ Print marker** - Simple black/white pattern
- **🔒 Object locking** - Multiple lock modes
- **🎲 Real-time generation** - Dynamic content creation
- **💾 State persistence** - Remembers between sessions
- **📱 Menu toggle** - Hide/show controls

### How it Works:
1. **Print Hiro marker** (provided in app)
2. **Point camera at marker**
3. **Objects appear and lock to marker**
4. **Generate new content dynamically**

### Lock Modes:
- **🔒 Full Lock** - Perfect stability
- **📍 Position Lock** - Fixed location, can animate
- **🔄 Rotation Lock** - Orientation locked
- **🆓 Free Mode** - Full animation

## 🎮 Usage Instructions

### For iPhone Users:
1. **Start with Quick Look version** - most reliable
2. **Use Safari browser** (not Chrome)
3. **Try marker versions** for dynamic content

### For Android Users:
1. **Use WebXR versions** with hit testing
2. **Chrome browser recommended**
3. **Marker versions work excellently**

### For Desktop Testing:
1. **Use marker versions** with webcam
2. **Print marker or display on phone**
3. **Perfect for development and testing**

## 🛠️ Development

### Project Structure:
```
ar-landscape/
├── quick-look.html              # Apple AR Quick Look
├── locked-shapes.html           # Enhanced marker AR with locking
├── shape-test.html             # Basic marker AR testing
├── marker-index.html           # Procedural landscapes on markers
├── index.html                  # Original AR.js implementation
├── enhanced-shape-generator.js  # Advanced AR logic with locking
├── shape-generator.js          # Basic shape generation
├── landscape-generator.js      # Procedural landscape logic
├── ar-manager.js              # AR interaction management
└── marker-ar.js               # Marker-specific AR handling
```

### Technologies Used:
- **Apple AR Quick Look** - Native iOS AR
- **A-Frame** - Web framework for VR/AR
- **AR.js** - Augmented reality for the web
- **WebXR** - Web standard for immersive experiences
- **Three.js** - 3D graphics library

## 🎯 Recommendations by Use Case

### **🏢 Professional/Commercial**
→ **AR Quick Look** for iPhone users, **WebXR** for Android

### **🎮 Gaming/Interactive**
→ **Enhanced Markers** with locking system

### **🎓 Education/Demos**
→ **Basic Shapes** for simplicity, **Quick Look** for reliability

### **🔬 Development/Testing**
→ **Enhanced Markers** on desktop with webcam

## 🚀 Next Steps

- **USDZ Generation** - Server-side landscape to USDZ conversion
- **WebXR Hit Testing** - Better iPhone Safari support
- **Multi-marker Support** - Multiple landscapes simultaneously
- **Cloud Persistence** - Save landscapes across devices
- **Social Features** - Share AR landscapes with others

## 🌐 Browser Support

| Browser | WebXR | AR.js | Quick Look |
|---------|-------|-------|------------|
| iPhone Safari | ❌ | ⚠️ | ✅ |
| Android Chrome | ✅ | ✅ | ❌ |
| Desktop Chrome | ⚠️ | ✅ | ❌ |
| Edge | ✅ | ✅ | ❌ |

**Legend:** ✅ Full Support, ⚠️ Limited Support, ❌ Not Supported

---

Enjoy creating landscapes in AR! 🌍✨
