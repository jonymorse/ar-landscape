// Enhanced Shape Generator with Locking Options
// Multiple lock modes for different AR behaviors

class EnhancedMarkerShapeGenerator {
    constructor() {
        this.container = document.querySelector('#landscape-container');
        this.marker = document.querySelector('#main-marker');
        this.isMarkerDetected = false;
        this.currentShapes = [];
        this.lockMode = 'full'; // 'full', 'position', 'rotation', 'scale', 'none'
        this.setupMarkerEvents();
        this.shapes = ['cube', 'sphere', 'pyramid', 'torus', 'cylinder'];
        this.colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
        this.savedState = this.loadSavedState();
    }

    setupMarkerEvents() {
        this.marker.addEventListener('markerFound', () => {
            console.log('Marker detected!');
            this.isMarkerDetected = true;
            this.updateUI();
            this.restoreSavedShapes();
        });

        this.marker.addEventListener('markerLost', () => {
            console.log('Marker lost!');
            this.isMarkerDetected = false;
            this.updateUI();
            if (this.lockMode !== 'full') {
                this.saveCurrentState();
            }
        });
    }

    updateUI() {
        const ui = document.querySelector('#ui');
        const statusDiv = ui.querySelector('.status') || this.createStatusDiv();
        const lockDiv = ui.querySelector('.lock-status') || this.createLockStatusDiv();
        
        if (this.isMarkerDetected) {
            statusDiv.innerHTML = '✅ Marker detected! Shapes locked and visible';
            statusDiv.style.color = '#4CAF50';
        } else {
            statusDiv.innerHTML = '📷 Point camera at printed marker';
            statusDiv.style.color = '#ff9800';
        }
        
        lockDiv.innerHTML = `🔒 Lock Mode: ${this.lockMode.toUpperCase()}`;
    }

    createStatusDiv() {
        const ui = document.querySelector('#ui');
        const statusDiv = document.createElement('div');
        statusDiv.className = 'status';
        statusDiv.style.marginTop = '10px';
        statusDiv.style.fontWeight = 'bold';
        statusDiv.style.fontSize = '13px';
        ui.insertBefore(statusDiv, ui.querySelector('.instructions'));
        return statusDiv;
    }

    createLockStatusDiv() {
        const ui = document.querySelector('#ui');
        const lockDiv = document.createElement('div');
        lockDiv.className = 'lock-status';
        lockDiv.style.marginTop = '5px';
        lockDiv.style.fontSize = '12px';
        lockDiv.style.color = '#4ECDC4';
        ui.insertBefore(lockDiv, ui.querySelector('.instructions'));
        return lockDiv;
    }

    // Set lock mode
    setLockMode(mode) {
        this.lockMode = mode;
        this.updateUI();
        this.applyLockMode();
        console.log(`Lock mode set to: ${mode}`);
    }

    applyLockMode() {
        this.currentShapes.forEach(shape => {
            switch(this.lockMode) {
                case 'full':
                    // Fully locked to marker - no independent movement
                    shape.removeAttribute('animation');
                    shape.removeAttribute('animation__pulse');
                    break;
                    
                case 'position':
                    // Position locked, but can rotate/animate
                    shape.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 4000');
                    shape.setAttribute('animation__pulse', 'property: scale; to: 1.1 1.1 1.1; direction: alternate; loop: true; dur: 2000');
                    break;
                    
                case 'rotation':
                    // Rotation locked, position can drift
                    shape.removeAttribute('animation');
                    shape.setAttribute('animation__pulse', 'property: scale; to: 1.1 1.1 1.1; direction: alternate; loop: true; dur: 2000');
                    break;
                    
                case 'scale':
                    // Scale locked, can move and rotate
                    shape.removeAttribute('animation__pulse');
                    shape.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 4000');
                    break;
                    
                case 'none':
                    // No locking - full animation
                    shape.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 4000');
                    shape.setAttribute('animation__pulse', 'property: scale; to: 1.1 1.1 1.1; direction: alternate; loop: true; dur: 2000');
                    // Add floating animation
                    shape.setAttribute('animation__float', 'property: position; to: 0 1.5 0; direction: alternate; loop: true; dur: 3000');
                    break;
            }
        });
    }

    generateShape() {
        this.clearShapes();
        
        const shapeType = this.shapes[Math.floor(Math.random() * this.shapes.length)];
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        
        const shape = this.createShape(shapeType, color);
        this.container.appendChild(shape);
        this.currentShapes.push(shape);
        
        this.applyLockMode();
        this.saveCurrentState();
        
        console.log(`Generated ${shapeType} in ${color} with ${this.lockMode} lock`);
    }

    createShape(type, color) {
        let shape;
        const scale = 0.8 + Math.random() * 0.4;
        
        switch(type) {
            case 'cube':
                shape = document.createElement('a-box');
                shape.setAttribute('width', scale);
                shape.setAttribute('height', scale);
                shape.setAttribute('depth', scale);
                break;
                
            case 'sphere':
                shape = document.createElement('a-sphere');
                shape.setAttribute('radius', scale * 0.6);
                break;
                
            case 'pyramid':
                shape = document.createElement('a-cone');
                shape.setAttribute('radius-bottom', scale * 0.6);
                shape.setAttribute('radius-top', '0');
                shape.setAttribute('height', scale);
                break;
                
            case 'torus':
                shape = document.createElement('a-torus');
                shape.setAttribute('radius', scale * 0.4);
                shape.setAttribute('radius-tubular', scale * 0.1);
                break;
                
            case 'cylinder':
                shape = document.createElement('a-cylinder');
                shape.setAttribute('radius', scale * 0.4);
                shape.setAttribute('height', scale);
                break;
        }
        
        // Position on marker with lock-specific adjustments
        const yPos = this.lockMode === 'full' ? scale * 0.5 : scale * 0.5 + Math.random() * 0.2;
        shape.setAttribute('position', `0 ${yPos} 0`);
        shape.setAttribute('color', color);
        shape.setAttribute('shadow', 'cast: true; receive: true');
        
        shape.classList.add('generated-shape');
        shape.setAttribute('data-type', type);
        shape.setAttribute('data-color', color);
        
        return shape;
    }

    // Generate locked formation
    generateLockedFormation() {
        this.clearShapes();
        
        const count = 5;
        const radius = 0.8;
        
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            const shapeType = this.shapes[Math.floor(Math.random() * this.shapes.length)];
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            
            const shape = this.createShape(shapeType, color);
            shape.setAttribute('position', `${x} 0.5 ${z}`);
            shape.setAttribute('scale', '0.6 0.6 0.6');
            
            this.container.appendChild(shape);
            this.currentShapes.push(shape);
        }
        
        this.applyLockMode();
        this.saveCurrentState();
        console.log(`Generated locked formation with ${count} shapes`);
    }

    // Save state for persistence
    saveCurrentState() {
        const state = {
            shapes: this.currentShapes.map(shape => ({
                type: shape.getAttribute('data-type'),
                color: shape.getAttribute('data-color'),
                position: shape.getAttribute('position'),
                scale: shape.getAttribute('scale')
            })),
            lockMode: this.lockMode
        };
        
        localStorage.setItem('ar-shapes-state', JSON.stringify(state));
    }

    loadSavedState() {
        try {
            const saved = localStorage.getItem('ar-shapes-state');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.log('No saved state found');
            return null;
        }
    }

    restoreSavedShapes() {
        if (this.savedState && this.savedState.shapes.length > 0) {
            this.clearShapes();
            
            this.savedState.shapes.forEach(shapeData => {
                const shape = this.createShape(shapeData.type, shapeData.color);
                if (shapeData.position) shape.setAttribute('position', shapeData.position);
                if (shapeData.scale) shape.setAttribute('scale', shapeData.scale);
                
                this.container.appendChild(shape);
                this.currentShapes.push(shape);
            });
            
            if (this.savedState.lockMode) {
                this.lockMode = this.savedState.lockMode;
            }
            
            this.applyLockMode();
            this.updateUI();
            console.log('Restored saved shapes');
        }
    }

    clearShapes() {
        const shapes = this.container.querySelectorAll('.generated-shape');
        shapes.forEach(shape => shape.remove());
        this.currentShapes = [];
        this.saveCurrentState();
    }
}

// Initialize enhanced shape generator
const enhancedShapeGenerator = new EnhancedMarkerShapeGenerator();

// Global functions for UI
function generateShape() {
    enhancedShapeGenerator.generateShape();
}

function generateFormation() {
    enhancedShapeGenerator.generateLockedFormation();
}

function clearShapes() {
    enhancedShapeGenerator.clearShapes();
}

function setLockMode(mode) {
    enhancedShapeGenerator.setLockMode(mode);
}

function showMarker() {
    document.getElementById('marker-modal').style.display = 'block';
}

function hideMarker() {
    document.getElementById('marker-modal').style.display = 'none';
}

// Auto-generate with full lock
window.addEventListener('load', () => {
    setTimeout(() => {
        generateShape();
    }, 2000);
});