// Enhanced AR landscape placement with ground detection
// Add this to your existing landscape-generator.js

class ARLandscapeManager extends LandscapeGenerator {
    constructor() {
        super();
        this.isPlaced = false;
        this.setupHitTesting();
    }

    setupHitTesting() {
        // Add ground plane for hit testing
        this.createGroundPlane();
        
        // Listen for screen taps
        document.addEventListener('click', (event) => {
            if (!event.target.closest('#ui')) {
                this.placeLandscapeAtTap(event);
            }
        });
    }

    createGroundPlane() {
        const scene = document.querySelector('a-scene');
        
        // Create invisible ground plane for hit testing
        const groundPlane = document.createElement('a-plane');
        groundPlane.setAttribute('id', 'ground-plane');
        groundPlane.setAttribute('position', '0 -1 -4');
        groundPlane.setAttribute('rotation', '-90 0 0');
        groundPlane.setAttribute('width', '20');
        groundPlane.setAttribute('height', '20');
        groundPlane.setAttribute('color', 'transparent');
        groundPlane.setAttribute('visible', 'false'); // Invisible but clickable
        groundPlane.classList.add('clickable');
        
        scene.appendChild(groundPlane);
    }

    placeLandscapeAtTap(event) {
        // Get camera position and direction
        const camera = document.querySelector('a-camera');
        const cameraEl = camera.object3D;
        
        // Calculate placement position in front of camera
        const direction = new THREE.Vector3(0, 0, -1);
        direction.applyQuaternion(cameraEl.quaternion);
        
        const position = cameraEl.position.clone();
        position.add(direction.multiplyScalar(3)); // 3 units in front
        position.y = -0.5; // Place on ground level
        
        this.generateLandscapeAt(position);
    }

    generateLandscapeAt(position) {
        // Clear existing landscape
        this.clearLandscape();
        
        // Create new landscape container
        const landscapeGroup = document.createElement('a-entity');
        landscapeGroup.setAttribute('id', 'placed-landscape');
        landscapeGroup.setAttribute('position', `${position.x} ${position.y} ${position.z}`);
        landscapeGroup.setAttribute('scale', '0.2 0.2 0.2'); // Scale down for tabletop size
        
        // Generate terrain with the group as container
        const originalContainer = this.container;
        this.container = landscapeGroup;
        this.createLandscape();
        this.container = originalContainer;
        
        // Add to scene
        document.querySelector('a-scene').appendChild(landscapeGroup);
        
        this.isPlaced = true;
        this.showPlacementUI();
    }

    showPlacementUI() {
        const ui = document.querySelector('#ui');
        ui.innerHTML = `
            <div>✅ Landscape Placed!</div>
            <button onclick="arManager.generateNewLandscape()">Generate New</button>
            <button onclick="arManager.moveLandscape()">Move Position</button>
            <button onclick="arManager.clearLandscape()">Clear</button>
        `;
    }

    generateNewLandscape() {
        if (this.isPlaced) {
            const existingLandscape = document.querySelector('#placed-landscape');
            if (existingLandscape) {
                const position = existingLandscape.getAttribute('position');
                this.generateLandscapeAt(new THREE.Vector3(position.x, position.y, position.z));
            }
        }
    }

    moveLandscape() {
        this.isPlaced = false;
        this.clearLandscape();
        document.querySelector('#ui').innerHTML = `
            <div>AR Landscape Generator</div>
            <div>Tap screen to place landscape</div>
            <button onclick="arManager.clearLandscape()">Clear</button>
        `;
    }

    clearLandscape() {
        const placedLandscape = document.querySelector('#placed-landscape');
        if (placedLandscape) {
            placedLandscape.remove();
        }
        super.clearLandscape();
        this.isPlaced = false;
    }
}

// Replace the old landscape generator
const arManager = new ARLandscapeManager();

// Update global functions
function generateLandscape() {
    if (!arManager.isPlaced) {
        document.querySelector('#ui').innerHTML = `
            <div>AR Landscape Generator</div>
            <div>👆 Tap screen to place landscape</div>
            <button onclick="arManager.clearLandscape()">Clear</button>
        `;
    } else {
        arManager.generateNewLandscape();
    }
}

function clearScene() {
    arManager.clearLandscape();
}