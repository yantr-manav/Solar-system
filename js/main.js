import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";


let scene,camera , renderer,controls,skybox;
let  sun,venus,mercury,earth,mars, jupiter, saturn, uranus,neptune;

let mercury_orbit_radius = 50;
let venus_orbit_radius = 60;
let earth_orbit_radius = 70;
let mars_orbit_radius = 80;
let jupiter_orbit_radius = 100;
let saturn_orbit_radius = 120;
let neptune_orbit_radius = 140;
let uranus_orbit_radius = 160;

let mercury_evolution_speed = 2;
let venus_evolution_speed = 1.5;
let earth_evolution_speed = 1;
let mars_evolution_speed = 0.8;
let jupiter_evolution_speed = 0.7;
let saturn_evolution_speed = 0.6;
let neptune_evolution_speed = 0.5;
let uranus_evolution_speed = 0.4;

function createMatrixArray() {
 const skyboxImagepaths = ['../img/skybox/space_ft.png', '../img/skybox/space_bk.png', '../img/skybox/space_up.png', '../img/skybox/space_dn.png', '../img/skybox/space_rt.png', '../img/skybox/space_lf.png']
    const materialArray = skyboxImagepaths.map((image) => {
        let texture = new THREE.TextureLoader().load(image);
        return new THREE.MeshBasicMaterial({map: texture, side: THREE.BackSide})

    })
    return materialArray
}

function setSkyBox(){
    const materialArray = createMatrixArray()
    let skyboxGeo = new THREE.BoxGeometry(1000,1000,1000);
    skybox = new THREE.Mesh(skyboxGeo,materialArray)
    scene.add(skybox)
}

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        85, // angle
        window.innerWidth/window.innerHeight, // aspect ratio
        0.1, //near
        1000, // far 
       
    )
    setSkyBox()

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(window.innerWidth,window.innerHeight)
    document.body.appendChild(renderer.domElement);
    renderer.domElement.id = "c";
    controls = new OrbitControls(camera,renderer.domElement);
    controls.minDistance = 12;
    controls.maxDistance = 1000;
    camera.position.z = 200;
    
}

function animate(time){
    requestAnimationFrame(animate);

    const rotationSpeed = 0.005;
    controls.update()
    renderer.render(scene,camera);
}

init();
animate(0);