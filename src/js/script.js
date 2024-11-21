
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';


import { Player, PlayerBB, walls, rotat, isPhone } from './walls.js';
import { Spheres, labels, LabelRenderer, CheckCollisions, buttonPointLabel } from './Answers.js';
import { movement } from './Movement.js';


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


renderer.setClearColor(0xa3a3a3);


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

var Ypos;
if (isPhone) {
    Ypos = 35;
} else {
    Ypos = 32.5;
}


switch (rotat) {
    case 1:
        camera.position.set(0, Ypos, 0.1);
        break;
    case 2:
        camera.position.set(0.1, Ypos, 0);
        break;
    case 3:
        camera.position.set(0, Ypos, -0.1);
        break;
    case 4:
        camera.position.set(-0.1, Ypos, 0);
        break;
    case 5:
        camera.position.set(0, -Ypos, 0.1);
        break;
    case 6:
        camera.position.set(0.1, -Ypos, 0);
        break;
    case 7:
        camera.position.set(0, -Ypos, -0.1);
        break;
    case 8:
        camera.position.set(-0.1, -Ypos, 0);
        break;
    default:
        camera.position.set(0, -Ypos, 0);
        break;
}


const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;
orbit.dampingFactor = 0.12;
orbit.enableZoom = false;


const controls = new TrackballControls(camera, renderer.domElement);
controls.noRotate = true;
controls.noPan = true;
controls.noZoom = false;
controls.zoomSpeed = 1.5;


const helper = new THREE.GridHelper(24,8);


scene.add(helper, walls, Player, buttonPointLabel);

for (let i = 0; i < labels.length; i++) {
    labels[i].position.set(Spheres.children[i].position.x, Spheres.children[i].position.y, Spheres.children[i].position.z);
    scene.add(labels[i]);
}


function animate() {

    const target = orbit.target;
    orbit.update();
    controls.target.set(target.x, target.y, target.z);
    controls.update();


    LabelRenderer.render(scene, camera);


    movement();


    PlayerBB.copy ( Player.geometry.boundingBox ).applyMatrix4(Player.matrixWorld);

    
    CheckCollisions();

    renderer.render(scene, camera);
}
  
renderer.setAnimationLoop(animate);
  
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    LabelRenderer.setSize( window.innerWidth, window.innerHeight );
});