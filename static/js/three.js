// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('robotCanvas') });
renderer.setSize(window.innerWidth, 500);

// Add basic lighting
const ambientLight = new THREE.AmbientLight(0x404040, 3); // Soft white light
scene.add(ambientLight);

// Create a simple humanoid robot model using Three.js geometries
const robotGroup = new THREE.Group();

// Body
const bodyGeometry = new THREE.BoxGeometry(1, 2, 1);
const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
robotGroup.add(bodyMesh);

// Head
const headGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
const headMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const headMesh = new THREE.Mesh(headGeometry, headMaterial);
headMesh.position.y = 1.5;
robotGroup.add(headMesh);

// Legs
const legGeometry = new THREE.BoxGeometry(0.4, 1, 0.4);
const legMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
leftLeg.position.set(-0.3, -1.5, 0);
rightLeg.position.set(0.3, -1.5, 0);
robotGroup.add(leftLeg);
robotGroup.add(rightLeg);

// Arms
const armGeometry = new THREE.BoxGeometry(0.3, 1, 0.3);
const armMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const leftArm = new THREE.Mesh(armGeometry, armMaterial);
const rightArm = new THREE.Mesh(armGeometry, armMaterial);
leftArm.position.set(-0.8, 0.5, 0);
rightArm.position.set(0.8, 0.5, 0);
robotGroup.add(leftArm);
robotGroup.add(rightArm);

// Add the robot to the scene
scene.add(robotGroup);

// Set the camera position
camera.position.z = 5;

// Create variables to track the action states
let isWalking = false;
let action = '';

// Animation loop to animate the robot based on commands
function animate() {
    requestAnimationFrame(animate);

    // Simulate walking forward by moving the robot group along the z-axis
    if (action === 'walk_forward') {
        robotGroup.position.z -= 0.02;
        leftLeg.rotation.x += 0.05;  // Simulate leg movement
        rightLeg.rotation.x -= 0.05;
        leftArm.rotation.x -= 0.05;  // Simulate arm movement
        rightArm.rotation.x += 0.05;
    }

    // Simulate waving hello with the right arm
    if (action === 'say_hello') {
        rightArm.rotation.z += 0.1;  // Wave right arm
        if (rightArm.rotation.z > Math.PI / 4) {
            rightArm.rotation.z = -Math.PI / 4;  // Reset wave position
        }
    }

    // Render the scene with the robot
    renderer.render(scene, camera);
}

// Start animation
animate();

// Function to perform actions based on the command processed by the backend
function performRobotAction(receivedAction) {
    action = receivedAction;  // Update the global action variable
    document.getElementById('output').innerText = `Robot action: ${action}`;

    // Reset robot parts to default positions when not walking or waving
    if (action === 'stop') {
        isWalking = false;
        leftLeg.rotation.x = 0;
        rightLeg.rotation.x = 0;
        leftArm.rotation.x = 0;
        rightArm.rotation.x = 0;
        robotGroup.position.z = 0;  // Reset position
    }
}

