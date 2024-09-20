//import * as THREE from 'three';

let recognition;
let robotCommand = "";

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = function (event) {
        robotCommand = event.results[0][0].transcript;
        document.getElementById('command').value = robotCommand;
        sendCommand();
    };
}


function startVoiceRecognition() {
    if (recognition) {
        recognition.start();
    }
}

function sendCommand() {
    const command = document.getElementById('command').value;
    document.getElementById('output').innerText = `Executing: ${command}`;

    // Send command to backend for NLP processing
    fetch(`${window.origin}/process-command`, {
        method: 'POST',
        credentials: "include",
        body: JSON.stringify(command),
        cache:"no-cache",
        headers: new Headers({ 'content-type': 'application/json' }),
    })
    .then(function(response){
            if(response.status !==200){
                console.log("eroor statud:");
            }
            response.json().then(function(data){
                console.log(data);
                performRobotAction(data.action);

            })

        })
}

function performRobotAction(action) {
    // This is where we perform the robot action based on NLP
    if (action === 'walk_forward') {
        document.getElementById('output').innerText = 'Robot is walking forward...';
    } else if (action === 'say_hello') {
        document.getElementById('output').innerText = 'Robot says: Hello!';
    } else if (action === 'stop') {
        document.getElementById('output').innerText = 'Robot stopped.';
    } else {
        document.getElementById('output').innerText = 'Unknown command.';
    }

    // You can use Three.js to animate the robot for actions like walking
    // Basic Three.js setup:
  // const scene = new THREE.Scene();
    //const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000);
    //const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('robotCanvas') });
    //renderer.setSize(window.innerWidth, 500);

    //const geometry = new THREE.BoxGeometry(1, 2, 1);
   //const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    //const robot = new THREE.Mesh(geometry, material);
   //scene.add(robot);

    //camera.position.z = 5;

    //function animate() {
      //  requestAnimationFrame(animate);
       // if (action === 'walk_forward') {
        //    robot.position.z -= 0.01; // Simulate walking forward
       // }
        //renderer.render(scene, camera);
    //}

    //animate();
}
