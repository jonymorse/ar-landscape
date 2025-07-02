// Simple Shape Generator for Marker AR - Desktop Testing
// Generates basic geometric shapes that attach directly to markers

class MarkerShapeGenerator {
    constructor() {
        this.container = document.querySelector('#landscape-container');
        this.marker = document.querySelector('#main-marker');
        this.isMarkerDetected = false;
        this.currentShape = null;
        this.setupMarkerEvents();
        this.shapes = ['cube', 'sphere', 'pyramid', 'torus', 'cylinder'];
        this.colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
    }

    setupMarkerEvents() {
        // Listen for marker found/lost events
        this.marker.addEventListener('markerFound', () => {
            console.log('Marker detected!');
            this.isMarkerDetected = true;
            this.updateUI();
        });

        this.marker.addEventListener('markerLost', () => {
            console.log('Marker lost!');
            this.isMarkerDetected = false;
            this.updateUI();
        });
    }

    updateUI() {
        const ui = document.querySelector('#ui');
        const statusDiv = ui.querySelector('.status') || this.createStatusDiv();
        
        if (this.isMarkerDetected) {
            statusDiv.innerHTML = '✅ Marker detected! Shape visible';
            statusDiv.style.color = '#4CAF50';
        } else {
            statusDiv.innerHTML = '📷 Point camera at printed marker';
            statusDiv.style.color = '#ff9800';
        }
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

    // Generate a random shape
    generateShape() {
        this.clearShape();
        
        const shapeType = this.shapes[Math.floor(Math.random() * this.shapes.length)];
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        
        this.currentShape = this.createShape(shapeType, color);
        this.container.appendChild(this.currentShape);
        
        console.log(`Generated ${shapeType} in ${color}`);
    }

    createShape(type, color) {
        let shape;
        const scale = 0.8 + Math.random() * 0.4; // Random scale between 0.8-1.2
        
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
        
        // Position directly on marker (slightly above for visibility)
        shape.setAttribute('position', `0 ${scale * 0.5} 0`);
        shape.setAttribute('color', color);
        shape.setAttribute('shadow', 'cast: true; receive: true');
        
        // Add rotation animation
        shape.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 4000');
        
        // Add hover/pulse effect
        shape.setAttribute('animation__pulse', 
            'property: scale; to: 1.1 1.1 1.1; direction: alternate; loop: true; dur: 2000');
        
        shape.classList.add('generated-shape');
        
        return shape;
    }

    // Generate specific shapes
    generateCube() {
        this.clearShape();
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.currentShape = this.createShape('cube', color);
        this.container.appendChild(this.currentShape);
    }

    generateSphere() {
        this.clearShape();
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.currentShape = this.createShape('sphere', color);
        this.container.appendChild(this.currentShape);
    }

    generatePyramid() {
        this.clearShape();
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.currentShape = this.createShape('pyramid', color);
        this.container.appendChild(this.currentShape);
    }

    // Clear current shape
    clearShape() {
        const shapes = this.container.querySelectorAll('.generated-shape');
        shapes.forEach(shape => shape.remove());
        this.currentShape = null;
    }

    // Generate multiple shapes in formation
    generateMultiple() {
        this.clearShape();
        
        const count = 3 + Math.floor(Math.random() * 3); // 3-5 shapes
        const radius = 0.8;
        
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            const shapeType = this.shapes[Math.floor(Math.random() * this.shapes.length)];
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            
            const shape = this.createShape(shapeType, color);
            shape.setAttribute('position', `${x} 0.5 ${z}`);
            shape.setAttribute('scale', '0.6 0.6 0.6'); // Smaller for multiple
            
            this.container.appendChild(shape);
        }
        
        console.log(`Generated ${count} shapes in formation`);
    }
}

// Initialize the shape generator
const shapeGenerator = new MarkerShapeGenerator();

// Global functions for UI buttons
function generateShape() {
    shapeGenerator.generateShape();
}

function generateCube() {
    shapeGenerator.generateCube();
}

function generateSphere() {
    shapeGenerator.generateSphere();
}

function generatePyramid() {
    shapeGenerator.generatePyramid();
}

function generateMultiple() {
    shapeGenerator.generateMultiple();
}

function clearShape() {
    shapeGenerator.clearShape();
}

function showMarker() {
    document.getElementById('marker-modal').style.display = 'block';
}

function hideMarker() {
    document.getElementById('marker-modal').style.display = 'none';
}

// Auto-generate initial shape
window.addEventListener('load', () => {
    setTimeout(() => {
        generateShape();
    }, 2000);
});