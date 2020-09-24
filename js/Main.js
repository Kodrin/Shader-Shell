//THREE JS
import * as THREE from '../lib/three/build/three.module.js';
import { GUI } from '../lib/three/examples/jsm/libs/dat.gui.module.js';
import { FBXLoader } from '../lib/three/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from '../lib/three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from '../lib/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../lib/three/examples/jsm/postprocessing/RenderPass.js';

//SHADER SHELL
import * as PRIMITIVES from './Primitives.js';
import { Helpers } from './Helpers.js';
import { Model } from './Model.js';

//SHADERS
import { ShellShader } from '../shaders/ShellShader.js';
import { ShellPostProcess } from '../shaders/ShellPostProcess.js';
import { ColorPrecision } from '../shaders/ColorPrecision.js';
import { BasicDiffuse } from '../shaders/BasicDiffuse.js';
import { PixelateEffect } from '../shaders/PixelateEffect.js';

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
  focal : 35,
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
let controls = new OrbitControls( camera, renderer.domElement );
let pointLight = new THREE.PointLight( 0xffffff, 0.8 );
// camera.add( pointLight );
scene.add( ambientLight );
scene.add( camera );

//TEXTURE/SHADER
let tatamiTexture = THREE.ImageUtils.loadTexture('../assets/models/Tatami.jpg');
let shellShader = new ShellShader();
shellShader.uniforms["baseTexture"].value = tatamiTexture;

let colorPrecision = new ColorPrecision();
colorPrecision.uniforms["baseTexture"].value = tatamiTexture;

let ball = new THREE.Mesh(new THREE.SphereGeometry(100, 100, 100), colorPrecision.shaderMaterial);
scene.add(ball);
// console.log(basicDiffuse.uniforms);
// console.log(colorPrecision.FragmentPass());
// console.log(colorPrecision.ParseToThree());
// console.log(tatamiTexture.image);
// let loader = new FBXLoader();
// loader.load( '../assets/models/TatamiFloor.fbx',
// function ( object ) {
//   let box = new THREE.Box3().setFromObject( object );
//   let center = new THREE.Vector3();
//   box.getCenter( center );
//   object.position.sub( center );
//
//   scene.add( object );
//   console.log();
// },
// // called when loading is in progresses
// function ( xhr ) {
//
//   console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
//
// },
// // called when loading has errors
// function ( error ) {
//
//   console.log( 'An error happened' );
//
// }
//
// );

//POST PROCESSING (IMAGE EFFECT)
composer = new EffectComposer( renderer );
composer.addPass( new RenderPass( scene, camera ) );
let pixelate = new PixelateEffect(window);
// composer.addPass( pixelate.shaderPass );
let screenShader = new ShellPostProcess();
// composer.addPass( screenShader.shaderPass );

//GUI
gui = new GUI({name: 'Shader Params'});

//BINDING INITIALIZES THE SLIDERS!
helpers.BindToGUI(gui);
pixelate.BindToGUI(gui);
screenShader.BindToGUI(gui);
colorPrecision.BindToGUI(gui);

//CALLED ONLY ONCE
function Init()
{
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
