import * as THREE from '../../JS/three.module.js';
import { OrbitControls } from '../../JS/OrbitControls.js';
import { GLTFLoader } from '../JS/GLTFLoader.js';
import { RoughnessMipmapper } from '../JS/RoughnessMipmapper.js';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();

const loaderTexture = new THREE.TextureLoader();
const texture = loaderTexture.load(
    'texture/aaa.jpg',
    () => {
        const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
        rt.fromEquirectangularTexture(renderer, texture);
        scene.background = rt.texture;
    });

scene.fog = new THREE.FogExp2('0xffffff', 0.05);

/** 
 * lights 
 */ 
const direcLight = new THREE.DirectionalLight(0xffffff, 1);
direcLight.position.set(0, 10, 0);
direcLight.target.position.set(0, 0, 0);
direcLight.castShadow = true;
direcLight.shadow.mapSize.width = 2048;
direcLight.shadow.mapSize.height = 2048;
scene.add(direcLight);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    
    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    
    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 1;
camera.position.y = 0;
camera.position.z = 5;
camera.rotation.y = 1;
scene.add(camera);

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 128, { format: THREE.RGBFormat, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter } );
let sphereCamera = new THREE.CubeCamera(1,500,cubeRenderTarget);
sphereCamera.position.set(0, 3, 0);
scene.add(sphereCamera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

/**
 * SceneGraph
 */ 
function dumpObject(obj, lines = [], isLast = true, prefix = '') {
    const localPrefix = isLast ? '└─' : '├─';
    lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
    const newPrefix = prefix + (isLast ? '  ' : '│ ');
    const lastNdx = obj.children.length - 1;
    obj.children.forEach((child, ndx) => {
        const isLast = ndx === lastNdx;
        dumpObject(child, lines, isLast, newPrefix);
    });
    return lines;
}

/*
 * Roughness Mipmapper
 */
const roughnessMipmapper = new RoughnessMipmapper( renderer );


/**
 * Object
 */
const materials = [];
const loaderGLTF = new GLTFLoader();
loaderGLTF.load('./model/scene.gltf', function(gltf){
    console.log(gltf);
    const root = gltf.scene;
    scene.add(root);
    console.log(dumpObject(root).join('\n'));
    root.traverse(function(object){
        if ( object.isMesh ) 
        {
            object.castShadow = true;
            object.receiveShadow = true;
            roughnessMipmapper.generateMipmaps( object.material );

        }
    });

},  
function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + "% Loaded");
},
function(error){
    console.log('An Error Occurred');
})

loaderGLTF.load('./model/scene2.gltf', function(gltf){
    console.log(gltf);
    const root = gltf.scene;
    scene.add(root);
    console.log(dumpObject(root).join('\n'));
    root.traverse(function(object){
        if ( object.isMesh ) 
        {
            object.castShadow = true;
            object.receiveShadow = true;
            roughnessMipmapper.generateMipmaps( object.material );

        }
    });

},  
function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + "% Loaded");
},
function(error){
    console.log('An Error Occurred');
})

const geometrySphere = new THREE.SphereGeometry(1, 32 , 16);
const matMoon = new THREE.MeshPhysicalMaterial( {wireframe: false, map: loaderTexture.load('./texture/moon.jpg')} );
matMoon.color = new THREE.Color(0xffffff);
const moon = new THREE.Mesh(geometrySphere, matMoon);
moon.position.y = 0;
moon.position.x = 3;
moon.position.z = 3.5;
scene.add(moon);

const refMat = new THREE.MeshBasicMaterial({
    envMap: sphereCamera.renderTarget.texture,
});
const refGeo = new THREE.SphereGeometry(.8, 32 , 16);
const refBall = new THREE.Mesh(refGeo, refMat);
refBall.position.y = 1;
refBall.position.x = 0;

scene.add(refBall);

const geometryBox = new THREE.BoxGeometry(10, 0.2, 10);
const materialBox = new THREE.MeshPhysicalMaterial( {wireframe: false} );
materialBox.color = new THREE.Color(0xffffff);
const cube = new THREE.Mesh(geometryBox, materialBox);
cube.position.y = -3;
scene.add(cube);

moon.castShadow = true;
cube.receiveShadow = true;
cube.castShadow = true;

/*
 * Controls
 */ 
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true
// controls.autoRotate = true;
// controls.autoRotateSpeed = 4;
const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.target.set(0, 0, 0);
    controls.minDistance = 5;
    controls.maxDistance = 500.0;
    controls.update();


/**
 * Animate
 */
const clock = new THREE.Clock();
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // Render
    sphereCamera.update(renderer, scene);
    renderer.render(scene, camera);
    moon.rotation.y = .5 * elapsedTime;


    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}
tick();