import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";


let scene,camera , renderer,controls,skybox;
let  sun,venus,mercury,earth,mars, jupiter, saturn, uranus,neptune;
let isAnimating = true;
let globalSpeedMultiplier = 1;
let animationId;

let mercury_orbit_radius = 50;
let venus_orbit_radius = 60;
let earth_orbit_radius = 70;
let mars_orbit_radius = 80;
let jupiter_orbit_radius = 100;
let saturn_orbit_radius = 120;
let neptune_orbit_radius = 140;
let uranus_orbit_radius = 160;

const baseRevolutionSpeeds = {
    mercury: 2,
    venus: 1.5,
    earth: 1,
    mars: 0.8,
    jupiter: 0.7,
    saturn: 0.6,
    neptune: 0.5,
    uranus: 0.4
};

        // Current revolution speeds (will be modified by sliders)
let mercury_revolution_speed = baseRevolutionSpeeds.mercury;
let venus_revolution_speed = baseRevolutionSpeeds.venus;
let earth_revolution_speed = baseRevolutionSpeeds.earth;
let mars_revolution_speed = baseRevolutionSpeeds.mars;
let jupiter_revolution_speed = baseRevolutionSpeeds.jupiter;
let saturn_revolution_speed = baseRevolutionSpeeds.saturn;
let neptune_revolution_speed = baseRevolutionSpeeds.neptune;
let uranus_revolution_speed = baseRevolutionSpeeds.uranus;

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


function loadPlanetTexture(texture,radius,widthSegments,heightSegments,meshType){
    const geometry = new THREE.SphereGeometry(radius,widthSegments,heightSegments);
    const loader = new THREE.TextureLoader();
    const planetTexture = loader.load(texture);
    const material = meshType == 'standard'? new THREE.MeshStandardMaterial({map: planetTexture}):new THREE.MeshBasicMaterial({map: planetTexture})
    
    const planet = new THREE.Mesh(geometry,material);
    return planet
    
}

function createRing(innerRadius){
    let outerRadius = innerRadius - 0.1;
    let thetaSegments = 100;
    const geometry = new THREE.RingGeometry(innerRadius,outerRadius,thetaSegments);
    const material = new THREE.MeshBasicMaterial({color:'#ffffff',side: THREE.DoubleSide});
    const mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh)
    mesh.rotation.x = Math.PI/2
    return mesh

}

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        85, // FOV
        window.innerWidth/window.innerHeight, // aspect ratio
        0.1, //near
        1000, // far 
       
    );
    setSkyBox()

    sun = loadPlanetTexture("../img/sun_hd.jpg",20,100,100,'basic');
    mercury = loadPlanetTexture("../img/mercury_hd.jpg",2,100,100,'standard');
    venus = loadPlanetTexture("../img/venus_hd.jpg",3,100,100,'standard');
    earth = loadPlanetTexture("../img/earth_hd.jpg",4,100,100,'standard');
    mars= loadPlanetTexture("../img/mars_hd.jpg",3.5,100,100,'standard');
    jupiter= loadPlanetTexture("../img/jupiter_hd.jpg",10,100,100,'standard');
    saturn = loadPlanetTexture("../img/saturn_hd.jpg",8,100,100,'standard');
    neptune = loadPlanetTexture("../img/neptune_hd.jpg",6,100,100,'standard');
    uranus= loadPlanetTexture("../img/uranus_hd.jpg",5,100,100,'standard');


    scene.add(sun)
    scene.add(mercury)
    scene.add(venus)
    scene.add(earth)
    scene.add(mars)
    scene.add(jupiter)
    scene.add(saturn)
    scene.add(neptune)
    scene.add(uranus)

    const sunlight = new THREE.PointLight(0xffffff,1,0);
    sunlight.position.copy(sun.position)
    scene.add(sunlight)

    createRing(mercury_orbit_radius)
    createRing(venus_orbit_radius)
    createRing(earth_orbit_radius)
    createRing(mars_orbit_radius)
    createRing(jupiter_orbit_radius)
    createRing(saturn_orbit_radius)
    createRing(neptune_orbit_radius)
    createRing(uranus_orbit_radius)

    
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(window.innerWidth,window.innerHeight)
    document.body.appendChild(renderer.domElement);
    renderer.domElement.id = "c";
    controls = new OrbitControls(camera,renderer.domElement);
    controls.minDistance = 12;
    controls.maxDistance = 1000;
    camera.position.z = 100;


    

    
}

function planetRevolver(time,speed,planet,orbitRadius,planetName){

        // Rrevolution of Planets
    const orbitSpeedMultiplier = 0.001;
    const planetAngle = time * orbitSpeedMultiplier * speed * globalSpeedMultiplier;

    planet.position.x = sun.position.x + orbitRadius * Math.cos(planetAngle)
    planet.position.z = sun.position.z + orbitRadius * Math.sin(planetAngle)
}
function animate(time){
                if (isAnimating) {
                animationId = requestAnimationFrame(animate);


    const rotationSpeed = 0.005;
    sun.rotation.y += rotationSpeed;
    mercury.rotation.y += rotationSpeed;
    venus.rotation.y += rotationSpeed;
    earth.rotation.y += rotationSpeed;
    mars.rotation.y += rotationSpeed;
    jupiter.rotation.y += rotationSpeed;
    saturn.rotation.y += rotationSpeed;
    neptune.rotation.y += rotationSpeed;
    uranus.rotation.y += rotationSpeed;


    planetRevolver(time,mercury_revolution_speed,mercury,mercury_orbit_radius,'mercury');
    planetRevolver(time,venus_revolution_speed,venus,venus_orbit_radius,'venus');
    planetRevolver(time,earth_revolution_speed,earth,earth_orbit_radius,'earth');
    planetRevolver(time,mars_revolution_speed,mars,mars_orbit_radius,'mars');
    planetRevolver(time,jupiter_revolution_speed,jupiter,jupiter_orbit_radius,'jupiter');
    planetRevolver(time,saturn_revolution_speed,saturn,saturn_orbit_radius,'saturn');
    planetRevolver(time,neptune_revolution_speed,neptune,neptune_orbit_radius,'neptune');
    planetRevolver(time,uranus_revolution_speed,uranus,uranus_orbit_radius,'uranus');

    controls.update();
    renderer.render(scene,camera);
}
}
function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight
    )
}
window.addEventListener("resize",onWindowResize,false)

        const startBtn = document.getElementById('startBtn');
        const stopBtn = document.getElementById('stopBtn');
        const resetBtn = document.getElementById('resetBtn');

        startBtn.addEventListener('click', () => {
            if (!isAnimating) {
                isAnimating = true;
                startBtn.classList.add('active');
                stopBtn.classList.remove('active');
                animate(performance.now());
            }
        });

        stopBtn.addEventListener('click', () => {
            if (isAnimating) {
                isAnimating = false;
                cancelAnimationFrame(animationId);
                stopBtn.classList.add('active');
                startBtn.classList.remove('active');
            }
        });

                resetBtn.addEventListener('click', () => {
            // Reset all planet positions
            mercury.position.set(mercury_orbit_radius, 0, 0);
            venus.position.set(venus_orbit_radius, 0, 0);
            earth.position.set(earth_orbit_radius, 0, 0);
            mars.position.set(mars_orbit_radius, 0, 0);
            jupiter.position.set(jupiter_orbit_radius, 0, 0);
            saturn.position.set(saturn_orbit_radius, 0, 0);
            neptune.position.set(neptune_orbit_radius, 0, 0);
            uranus.position.set(uranus_orbit_radius, 0, 0);
            
            // Reset all speeds
            Object.keys(baseRevolutionSpeeds).forEach(planet => {
                const slider = document.getElementById(`${planet}-speed`);
                const value = document.getElementById(`${planet}-value`);
                slider.value = baseRevolutionSpeeds[planet];
                value.textContent = baseRevolutionSpeeds[planet] + 'x';
            });
            
            // Reset global speed
            document.getElementById('global-speed').value = 1;
            document.getElementById('global-value').textContent = '1x';
            globalSpeedMultiplier = 1;
            
            // Update revolution speeds
            mercury_revolution_speed = baseRevolutionSpeeds.mercury;
            venus_revolution_speed = baseRevolutionSpeeds.venus;
            earth_revolution_speed = baseRevolutionSpeeds.earth;
            mars_revolution_speed = baseRevolutionSpeeds.mars;
            jupiter_revolution_speed = baseRevolutionSpeeds.jupiter;
            saturn_revolution_speed = baseRevolutionSpeeds.saturn;
            neptune_revolution_speed = baseRevolutionSpeeds.neptune;
            uranus_revolution_speed = baseRevolutionSpeeds.uranus;
        });


                // Global speed control
        const globalSpeedSlider = document.getElementById('global-speed');
        const globalSpeedValue = document.getElementById('global-value');

        globalSpeedSlider.addEventListener('input', (e) => {
            globalSpeedMultiplier = parseFloat(e.target.value);
            globalSpeedValue.textContent = globalSpeedMultiplier + 'x';
        });

        // Individual planet speed controls
        const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'neptune', 'uranus'];
        
        planets.forEach(planet => {
            const slider = document.getElementById(`${planet}-speed`);
            const valueDisplay = document.getElementById(`${planet}-value`);

            slider.addEventListener('input', (e) => {
                const speed = parseFloat(e.target.value);
                valueDisplay.textContent = speed + 'x';
                
                // Update the corresponding revolution speed variable
                switch(planet) {
                    case 'mercury': mercury_revolution_speed = speed; break;
                    case 'venus': venus_revolution_speed = speed; break;
                    case 'earth': earth_revolution_speed = speed; break;
                    case 'mars': mars_revolution_speed = speed; break;
                    case 'jupiter': jupiter_revolution_speed = speed; break;
                    case 'saturn': saturn_revolution_speed = speed; break;
                    case 'neptune': neptune_revolution_speed = speed; break;
                    case 'uranus': uranus_revolution_speed = speed; break;
                }
            });
        });

init();
animate(0);