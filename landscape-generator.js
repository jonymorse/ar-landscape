// AR Landscape Generator
// Simple procedural landscape generation for WebXR AR

class LandscapeGenerator {
    constructor() {
        this.container = document.querySelector('#landscape-container');
        this.currentLandscape = null;
        this.terrainSize = 20;
        this.heightScale = 3;
        this.colors = [
            '#2d5016', // Dark green
            '#3d6b1e', // Medium green  
            '#4a7c23', // Light green
            '#8b4513', // Brown
            '#a0522d'  // Sandy brown
        ];
    }

    // Simple noise function for terrain generation
    noise(x, z) {
        let n = Math.sin(x * 0.1) * Math.cos(z * 0.1) * 2;
        n += Math.sin(x * 0.05) * Math.cos(z * 0.05) * 4;
        n += Math.random() * 0.5;
        return n;
    }

    // Generate terrain mesh points
    generateTerrain() {
        const terrain = [];
        const step = 2;
        
        for (let x = -this.terrainSize; x <= this.terrainSize; x += step) {
            for (let z = -this.terrainSize; z <= this.terrainSize; z += step) {
                const height = this.noise(x, z) * this.heightScale;
                const color = this.getHeightColor(height);
                
                terrain.push({
                    position: { x, y: height, z },
                    color: color
                });
            }
        }
        
        return terrain;
    }

    // Get color based on height
    getHeightColor(height) {
        if (height < 0.5) return this.colors[0]; // Low areas - dark green
        if (height < 1.5) return this.colors[1]; // Medium areas - medium green
        if (height < 2.5) return this.colors[2]; // Higher areas - light green
        if (height < 4) return this.colors[3];   // High areas - brown
        return this.colors[4];                   // Peaks - sandy brown
    }

    // Add trees to the landscape
    addTrees(terrain) {
        const treeCount = Math.floor(Math.random() * 10) + 5;
        
        for (let i = 0; i < treeCount; i++) {
            const randomPoint = terrain[Math.floor(Math.random() * terrain.length)];
            if (randomPoint.position.y > 0.5 && randomPoint.position.y < 3) {
                this.createTree(randomPoint.position);
            }
        }
    }
    // Create a simple tree
    createTree(position) {
        // Tree trunk
        const trunk = document.createElement('a-cylinder');
        trunk.setAttribute('position', `${position.x} ${position.y + 1} ${position.z}`);
        trunk.setAttribute('height', '2');
        trunk.setAttribute('radius', '0.2');
        trunk.setAttribute('color', '#8B4513');
        trunk.classList.add('landscape-element');
        this.container.appendChild(trunk);

        // Tree leaves
        const leaves = document.createElement('a-sphere');
        leaves.setAttribute('position', `${position.x} ${position.y + 2.5} ${position.z}`);
        leaves.setAttribute('radius', '1.5');
        leaves.setAttribute('color', '#228B22');
        leaves.classList.add('landscape-element');
        this.container.appendChild(leaves);
    }

    // Add rocks to the landscape
    addRocks(terrain) {
        const rockCount = Math.floor(Math.random() * 8) + 3;
        
        for (let i = 0; i < rockCount; i++) {
            const randomPoint = terrain[Math.floor(Math.random() * terrain.length)];
            this.createRock(randomPoint.position);
        }
    }

    // Create a simple rock
    createRock(position) {
        const rock = document.createElement('a-box');
        const size = Math.random() * 0.8 + 0.3;
        
        rock.setAttribute('position', `${position.x} ${position.y + size/2} ${position.z}`);
        rock.setAttribute('width', size);
        rock.setAttribute('height', size * 0.8);
        rock.setAttribute('depth', size);
        rock.setAttribute('color', '#696969');
        rock.setAttribute('rotation', `${Math.random() * 360} ${Math.random() * 360} ${Math.random() * 360}`);
        rock.classList.add('landscape-element');
        
        this.container.appendChild(rock);
    }

    // Create the main landscape
    createLandscape() {
        const terrain = this.generateTerrain();
        
        // Create terrain points
        terrain.forEach(point => {
            const terrainElement = document.createElement('a-sphere');
            terrainElement.setAttribute('position', `${point.position.x} ${point.position.y} ${point.position.z}`);
            terrainElement.setAttribute('radius', '0.8');
            terrainElement.setAttribute('color', point.color);
            terrainElement.classList.add('landscape-element');
            this.container.appendChild(terrainElement);
        });

        // Add trees and rocks
        this.addTrees(terrain);
        this.addRocks(terrain);
        
        // Add some ambient elements
        this.addAmbientElements();
    }
    // Add ambient elements like flowers or small details
    addAmbientElements() {
        const elementCount = Math.floor(Math.random() * 15) + 5;
        
        for (let i = 0; i < elementCount; i++) {
            const x = (Math.random() - 0.5) * this.terrainSize * 2;
            const z = (Math.random() - 0.5) * this.terrainSize * 2;
            const y = this.noise(x, z) * this.heightScale;
            
            // Create small flowers or grass
            const element = document.createElement('a-cylinder');
            element.setAttribute('position', `${x} ${y + 0.2} ${z}`);
            element.setAttribute('height', '0.4');
            element.setAttribute('radius', '0.05');
            element.setAttribute('color', Math.random() > 0.5 ? '#FFD700' : '#FF69B4');
            element.classList.add('landscape-element');
            this.container.appendChild(element);
        }
    }

    // Clear existing landscape
    clearLandscape() {
        const elements = this.container.querySelectorAll('.landscape-element');
        elements.forEach(element => element.remove());
    }

    // Generate new landscape
    generate() {
        this.clearLandscape();
        this.createLandscape();
    }
}

// Initialize the landscape generator
const landscapeGen = new LandscapeGenerator();

// Global functions for UI buttons
function generateLandscape() {
    landscapeGen.generate();
}

function clearScene() {
    landscapeGen.clearLandscape();
}

// Auto-generate initial landscape when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        generateLandscape();
    }, 2000); // Wait 2 seconds for AR to initialize
});

// Add click/tap interaction to place landscapes
document.addEventListener('click', (event) => {
    // Only respond to clicks on the scene, not UI buttons
    if (!event.target.closest('#ui')) {
        generateLandscape();
    }
});
