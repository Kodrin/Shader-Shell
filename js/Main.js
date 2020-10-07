//THREE JS
import * as THREE from '../lib/three/build/three.module.js';
import { GUI } from '../lib/three/examples/jsm/libs/dat.gui.module.js';
import { FBXLoader } from '../lib/three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from '../lib/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from '../lib/three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from '../lib/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../lib/three/examples/jsm/postprocessing/RenderPass.js';

//SHADER SHELL
import * as PRIMITIVES from './Primitives.js';
import { ShellControls } from './ShellControls.js';
import { Helpers } from './Helpers.js';
import { Model } from './Model.js';

//SHADERS
import { ShellShader } from '../shaders/ShellShader.js';
import { ShellPostProcess } from '../shaders/ShellPostProcess.js';
import { ColorPrecision } from '../shaders/ColorPrecision.js';
import { BasicDiffuse } from '../shaders/BasicDiffuse.js';
import { PixelateEffect } from '../shaders/PixelateEffect.js';
import { NormalPass } from '../shaders/NormalPass.js';

import { FilmShader } from '../lib/three/examples/jsm/shaders/FilmShader.js';

//GLOBAL
let THREEPATH, GENERAL_SETTINGS, CAMERA_SETTINGS, GUISETTINGS, SHADER_PARAMS;
THREEPATH = '../lib/three';

GENERAL_SETTINGS =
{
  container : "canvas",
  width : 750,
  height : 750

};

CAMERA_SETTINGS =
{
  focal : 60,
  near: 0.1,
  far: 10000,
  aspect : 0.5,
  pixelRatio : 1.0,
  antialias : true
};

GUISETTINGS =
{
  show : true
};

SHADER_PARAMS = {
  pixelSize: 8,
  postprocessing: false
};


//COMMON
let container, scene, camera, renderer, gui;
let composer, pixelPass;

container = document.getElementById( GENERAL_SETTINGS.container );
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( CAMERA_SETTINGS.focal, GENERAL_SETTINGS.width / GENERAL_SETTINGS.height, CAMERA_SETTINGS.near, CAMERA_SETTINGS.far );
renderer = new THREE.WebGLRenderer({ antialias : CAMERA_SETTINGS.antialias, canvas: container });

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( GENERAL_SETTINGS.width , GENERAL_SETTINGS.height);

//HELPERS
let helpers = new Helpers();
helpers.AddToScene(scene);

//LIGHTING
let ambientLight = new THREE.AmbientLight( 0xcccccc, 1.4 );
// let controls = new OrbitControls( camera, renderer.domElement );
let shellControls = new ShellControls(camera, renderer.domElement);
let pointLight = new THREE.PointLight( 0xffffff, 0.8 );
// camera.add( pointLight );
// scene.add( ambientLight );
scene.add( camera );

//TEXTURE/SHADER
let tatamiTexture = THREE.ImageUtils.loadTexture('../assets/models/textures/lambert1_baseColor.png');
tatamiTexture.flipY = false;
let shellShader = new ShellShader();
shellShader.uniforms["baseTexture"].value = tatamiTexture;

let colorPrecision = new ColorPrecision();
colorPrecision.uniforms["baseTexture"].value = tatamiTexture;

let ball = new THREE.Mesh(new THREE.SphereGeometry(100, 100, 100), colorPrecision.shaderMaterial);
// scene.add(ball);

//https://github.com/Adjam93/threejs-model-viewer/blob/master/js/main.js
let materials = {
    unlitMaterial: new THREE.MeshBasicMaterial( {color: 0x00f2ff} ),
    basicMaterial: new THREE.MeshBasicMaterial(),
    wireframeMaterial: new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        wireframe: true,
        shininess: 100,
        specular: 0x000, emissive: 0x000,
        flatShading: false, depthWrite: true, depthTest: true
    }),
    phongMaterial: new THREE.MeshPhongMaterial({
        color: 0x555555, specular: 0xffffff, shininess: 10,
        flatShading: false, side: THREE.DoubleSide, skinning: true
    }),
    colorPrecision: colorPrecision.shaderMaterial
};

let loader = new FBXLoader();
let gltfLoader = new GLTFLoader();

// gltfLoader.load( '../assets/models/scene.gltf', function ( gltf ) {
//
//   gltf.scene.scale.set(100,100,100);
//   console.log(gltf.asset);
//   gltf.scene.traverse( function( child ) {
//       if ( child instanceof THREE.Mesh ) {
//           child.material = materials.wireframeMaterial;
//           // console.log(child.material);
//       }
//   } );
//
// 	scene.add( gltf.scene );
//
// }, undefined, function ( error ) {
//
// 	console.error( error );
//
// } );

// let tatamiFloor = new Model('../assets/models/TatamiFloor.fbx', colorPrecision);
// tatamiFloor.Load(loader, scene, materials.colorPrecision);

let dimsum = new Model('../assets/models/scene.gltf', colorPrecision);
dimsum.LoadGLTF(gltfLoader, scene, materials.colorPrecision);

// let cube = new PRIMITIVES.Cube();
// scene.add(cube.object);
// dimsum.AddToScene(scene);
//for debugging
// document.addEventListener("click", function(){
//   alert("CLick // DEBUG: !");
//   // dimsum.SwitchMaterial(materials.basicMaterial);
//   // dimsum.SetVisible(false);
// });

// console.log(tatamiFloor.material);

//POST PROCESSING (IMAGE EFFECT)
composer = new EffectComposer( renderer );
composer.addPass( new RenderPass( scene, camera ) );
let pixelate = new PixelateEffect(window);
// composer.addPass( pixelate.shaderPass );
let screenShader = new ShellPostProcess();
// composer.addPass( screenShader.shaderPass );
let normalShader = new NormalPass(window);
composer.addPass( normalShader.shaderPass );
// let filmShader = new FilmShader();
// composer.addPass( filmShader );

//GUI
gui = new GUI({name: 'Shader Params'});


//CALLED ONLY ONCE
function Init()
{
  //BINDING INITIALIZES THE SLIDERS!
  helpers.BindToGUI(gui);
  pixelate.BindToGUI(gui);
  screenShader.BindToGUI(gui);
  colorPrecision.BindToGUI(gui);

  //CAMERA
  camera.position.set(250,250,250);
  camera.lookAt(scene.position);
}

function UpdateGUI()
{
  colorPrecision.UpdateGUI();
  screenShader.UpdateGUI();
  pixelate.UpdateGUI();
}

//CALLED EVERY FRAME
function Update()
{
  UpdateGUI();

  dimsum.Rotate(new   THREE.Vector3(0,1,0), 0.001);
  // cube.Rotate(new   THREE.Vector3(1,1,1), 0.001);

}

function Render()
{
  if ( true )
  {
    composer.render();
  }
  else
  {
    renderer.render( scene, camera );
  }
}

//ANIMATE/UPDATE
function Animate() {
  Update();
  Render();
  requestAnimationFrame( Animate );
}

//RUNNN
Init();
Animate();


//https://stackoverflow.com/questions/16200082/assigning-materials-to-an-objloader-model-in-three-js

// let modelObj;
// loader.load( '../assets/models/TatamiFloor.fbx',
//     function( obj ){
//         obj.traverse( function( child ) {
//             if ( child instanceof THREE.Mesh ) {
//                 child.material = materials.colorPrecision;
//             }
//         } );
//         modelObj = obj;
//         scene.add( obj );
//     },
//     function( xhr ){
//         console.log( (xhr.loaded / xhr.total * 100) + "% loaded")
//     },
//     function( err ){
//         console.error( "Error loading 'ship.obj'")
//     }
// );
