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
 const skyboxImagepaths = ['img/skybox/space_ft.png', 'img/skybox/space_bk.png', 'img/skybox/space_up.png', 'img/skybox/space_dn.png', 'img/skybox/space_rt.png', 'img/skybox/space_lf.png']
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


function loadPlanetTexture(texture,radius,widthSegments,heightSegments,meshType){
    const geometry = new THREE.SphereGeometry(radius,widthSegments,heightSegments);
    const loader = new THREE.TextureLoader();
    const planetTexture = loader.load(texture);
    const material = new THREE.MeshBasicMaterial({map:planetTexture});

    const planet = new THREE.Mesh(geometry,material);
    return planet

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

    sun = loadPlanetTexture("img/sun_hd.jpg",20,100,100,'basic');
    mercury = loadPlanetTexture("img/mercury_hd.jpg",2,100,100,'standard');
    venus = loadPlanetTexture("img/venus_hd.jpg",3,100,100,'standard');
    earth = loadPlanetTexture("img/earth_hd.jpg",4,100,100,'standard');
    mars= loadPlanetTexture("img/mars_hd.jpg",3.5,100,100,'standard');
    jupiter= loadPlanetTexture("img/jupiter_hd.jpg",10,100,100,'standard');
    saturn = loadPlanetTexture("img/saturn_hd.jpg",8,100,100,'standard');
    neptune = loadPlanetTexture("img/neptune_hd.jpg",6,100,100,'standard');
    uranus= loadPlanetTexture("img/uranus_hd.jpg",5,100,100,'standard');
    scene.add(sun)
    scene.add(mercury)
    scene.add(venus)
    scene.add(earth)
    scene.add(mars)
    scene.add(jupiter)
    scene.add(saturn)
    scene.add(neptune)
    scene.add(uranus)
    
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(window.innerWidth,window.innerHeight)
    document.body.appendChild(renderer.domElement);
    renderer.domElement.id = "c";
    controls = new OrbitControls(camera,renderer.domElement);
    controls.minDistance = 12;
    controls.maxDistance = 1000;
    camera.position.z = 100;


    
}

function animate(time){
    requestAnimationFrame(animate);

    const rotationSpeed = 0.005;
    sunrotation.y += rotationSpeed;
    controls.update()
    renderer.render(scene,camera);
}

init();
animate(0);