//GLOBAL
let THREEPATH = '../lib/three';

let SETTINGS =
{
  container : "canvas",
  width : 600,
  height : 600,
  aspect : 0.5,
  pixelRatio : 1.0,
  antialias : true
};

let CAMERASETTINGS
{
  focal : 50
};

let GUISETTINGS
{
  show : true
};

//LIBRARIES
import * as THREE from '../lib/three/build/three.module.js';

import { GUI } from '../lib/three/examples/jsm/libs/dat.gui.module.js';

import * as PRIMITIVES from './Primitives.js';
import { Model } from './Model.js';
import { FBXLoader } from '../lib/three/examples/jsm/loaders/FBXLoader.js';


import { OrbitControls } from '../lib/three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from '../lib/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../lib/three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from '../lib/three/examples/jsm/postprocessing/ShaderPass.js';
import { PixelShader } from '../lib/three/examples/jsm/shaders/PixelShader.js';
import { PixelFlow } from '../shaders/PixelFlow.js';

let container, scene, camera, renderer, gui;
let composer, pixelPass, params;

//COMMON
container = document.getElementById( SETTINGS.container );
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, SETTINGS.width / SETTINGS.height, 0.1, 1000000 );
renderer = new THREE.WebGLRenderer({ antialias : SETTINGS.antialias, canvas: container });

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( SETTINGS.width , SETTINGS.height);

var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
scene.add( ambientLight );
var controls = new OrbitControls( camera, renderer.domElement );
var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
camera.add( pointLight );
scene.add(camera);

//CUBE
let sphere = new PRIMITIVES.Sphere();
let cube = new PRIMITIVES.Cube();
// scene.add( cube.object );
scene.add(sphere.object);

// let model = new Model("../assets/models/yaeji.fbx", scene);

// let loader = new FBXLoader();
// loader.load( '../assets/models/yaeji.fbx',
// function ( object ) {
//   var box = new THREE.Box3().setFromObject( object );
//   var center = new THREE.Vector3();
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

//POST PROCESSING
params = {
  pixelSize: 8,
  postprocessing: true
};

composer = new EffectComposer( renderer );
composer.addPass( new RenderPass( scene, camera ) );

pixelPass = new ShaderPass( PixelFlow );
pixelPass.uniforms[ "resolution" ].value = new THREE.Vector2( window.innerWidth, window.innerHeight );
pixelPass.uniforms[ "resolution" ].value.multiplyScalar( window.devicePixelRatio );
pixelPass.uniforms[ "pixelSize" ].value = params.pixelSize;
composer.addPass( pixelPass );

//GUI
gui = new GUI();
gui.add( params, 'pixelSize' ).min( 2 ).max( 32 ).step( 2 );
gui.add( params, 'postprocessing' );

//CALLED ONLY ONCE
function Init()
{
  //CAMERA
  // camera.position.z = 2.5;
  camera.position.set(0,0,1.5); camera.lookAt(scene.position);

}

function UpdateGUI() {

  pixelPass.uniforms[ "pixelSize" ].value = params.pixelSize;

}

//CALLED EVERY FRAME
function Update()
{
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  // cube.Rotate(new THREE.Vector3(1,0,0), 0.01);
  UpdateGUI();
}

//ANIMATE/UPDATE
function Animate() {
  Update();

  if ( params.postprocessing )
  {
    composer.render();
  }
  else
  {
    renderer.render( scene, camera );
  }

  requestAnimationFrame( Animate );
}

//RUNNN
Init();
Animate();
