// Marker-based AR Landscape Generator
// Optimized for iPhone Safari with AR.js markers

class MarkerARLandscape extends LandscapeGenerator {
    constructor() {
        super();
        this.container = document.querySelector('#landscape-container');
        this.marker = document.querySelector('#main-marker');
        this.isMarkerDetected = false;
        this.setupMarkerEvents();
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
            statusDiv.innerHTML = '✅ Marker detected! Landscape visible';
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

    // Override the generate method for marker-based placement
    generate() {
        this.clearLandscape();
        this.createMarkerLandscape();
    }

    createMarkerLandscape() {
        // Generate terrain optimized for marker display
        const terrain = this.generateCompactTerrain();
        
        // Create terrain points
        terrain.forEach(point => {
            const terrainElement = document.createElement('a-sphere');
            terrainElement.setAttribute('position', `${point.position.x} ${point.position.y} ${point.position.z}`);
            terrainElement.setAttribute('radius', '0.3');
            terrainElement.setAttribute('color', point.color);
            terrainElement.setAttribute('shadow', 'cast: true; receive: true');
            terrainElement.classList.add('landscape-element');
            this.container.appendChild(terrainElement);
        });

        // Add trees and rocks scaled for marker
        this.addMarkerTrees(terrain);
        this.addMarkerRocks(terrain);
        this.addMarkerAmbientElements();
        
        console.log('Landscape generated on marker');
    }

    // Generate more compact terrain for marker display
    generateCompactTerrain() {
        const terrain = [];
        const size = 8; // Smaller for marker
        const step = 1.5;
        
        for (let x = -size; x <= size; x += step) {
            for (let z = -size; z <= size; z += step) {
                const height = this.noise(x, z) * 1.5; // Reduced height scale
                const color = this.getHeightColor(height);
                
                terrain.push({
                    position: { x: x * 0.3, y: height * 0.3, z: z * 0.3 }, // Scale down
                    color: color
                });
            }
        }
        
        return terrain;
    }

    // Scaled trees for marker
    addMarkerTrees(terrain) {
        const treeCount = Math.floor(Math.random() * 6) + 3;
        
        for (let i = 0; i < treeCount; i++) {
            const randomPoint = terrain[Math.floor(Math.random() * terrain.length)];
            if (randomPoint.position.y > 0.1 && randomPoint.position.y < 1) {
                this.createMarkerTree(randomPoint.position);
            }
        }
    }

    createMarkerTree(position) {
        // Tree trunk (scaled for marker)
        const trunk = document.createElement('a-cylinder');
        trunk.setAttribute('position', `${position.x} ${position.y + 0.5} ${position.z}`);
        trunk.setAttribute('height', '1');
        trunk.setAttribute('radius', '0.08');
        trunk.setAttribute('color', '#8B4513');
        trunk.setAttribute('shadow', 'cast: true');
        trunk.classList.add('landscape-element');
        this.container.appendChild(trunk);

        // Tree leaves (scaled for marker)
        const leaves = document.createElement('a-sphere');
        leaves.setAttribute('position', `${position.x} ${position.y + 1.2} ${position.z}`);
        leaves.setAttribute('radius', '0.6');
        leaves.setAttribute('color', '#228B22');
        leaves.setAttribute('shadow', 'cast: true');
        leaves.classList.add('landscape-element');
        this.container.appendChild(leaves);
    }

    // Scaled rocks for marker
    addMarkerRocks(terrain) {
        const rockCount = Math.floor(Math.random() * 5) + 2;
        
        for (let i = 0; i < rockCount; i++) {
            const randomPoint = terrain[Math.floor(Math.random() * terrain.length)];
            this.createMarkerRock(randomPoint.position);
        }
    }

    createMarkerRock(position) {
        const rock = document.createElement('a-box');
        const size = Math.random() * 0.3 + 0.15; // Smaller rocks
        
        rock.setAttribute('position', `${position.x} ${position.y + size/2} ${position.z}`);
        rock.setAttribute('width', size);
        rock.setAttribute('height', size * 0.8);
        rock.setAttribute('depth', size);
        rock.setAttribute('color', '#696969');
        rock.setAttribute('shadow', 'cast: true; receive: true');
        rock.setAttribute('rotation', `${Math.random() * 360} ${Math.random() * 360} ${Math.random() * 360}`);
        rock.classList.add('landscape-element');
        
        this.container.appendChild(rock);
    }

    // Ambient elements scaled for marker
    addMarkerAmbientElements() {
        const elementCount = Math.floor(Math.random() * 8) + 3;
        
        for (let i = 0; i < elementCount; i++) {
            const x = (Math.random() - 0.5) * 4;
            const z = (Math.random() - 0.5) * 4;
            const y = this.noise(x * 3, z * 3) * 0.5;
            
            // Create small flowers or grass
            const element = document.createElement('a-cylinder');
            element.setAttribute('position', `${x * 0.3} ${y * 0.3 + 0.1} ${z * 0.3}`);
            element.setAttribute('height', '0.2');
            element.setAttribute('radius', '0.03');
            element.setAttribute('color', Math.random() > 0.5 ? '#FFD700' : '#FF69B4');
            element.classList.add('landscape-element');
            this.container.appendChild(element);
        }
    }
}

// Initialize marker-based AR landscape
const markerLandscape = new MarkerARLandscape();

// Global functions for UI
function generateLandscape() {
    markerLandscape.generate();
}

function clearLandscape() {
    markerLandscape.clearLandscape();
}

function showMarker() {
    document.getElementById('marker-modal').style.display = 'block';
}

function hideMarker() {
    document.getElementById('marker-modal').style.display = 'none';
}

// Auto-generate initial landscape after delay
window.addEventListener('load', () => {
    setTimeout(() => {
        generateLandscape();
    }, 3000);
});