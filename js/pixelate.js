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

import { OrbitControls } from '../lib/three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from '../lib/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../lib/three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from '../lib/three/examples/jsm/postprocessing/ShaderPass.js';
import { PixelShader } from '../lib/three/examples/jsm/shaders/PixelShader.js';
import { PixelFlow } from '../shaders/PixelFlow.js';



//COMMON
let container = document.getElementById( SETTINGS.container );
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, SETTINGS.width / SETTINGS.height, 0.1, 1000 );
let renderer = new THREE.WebGLRenderer({ antialias : SETTINGS.antialias, canvas: container });

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( SETTINGS.width , SETTINGS.height);

//CUBE
let geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
let material = new THREE.MeshBasicMaterial( {color: 0x00f2ff} );
let cube = new THREE.Mesh( geometry, material );
scene.add( cube );

//CAMERA
camera.position.z = 2.5;

//POST PROCESSING
let params = {
  pixelSize: 8,
  postprocessing: true
};

let composer = new EffectComposer( renderer );
composer.addPass( new RenderPass( scene, camera ) );

let pixelPass = new ShaderPass( PixelFlow );
pixelPass.uniforms[ "resolution" ].value = new THREE.Vector2( window.innerWidth, window.innerHeight );
pixelPass.uniforms[ "resolution" ].value.multiplyScalar( window.devicePixelRatio );
pixelPass.uniforms[ "pixelSize" ].value = params.pixelSize;
composer.addPass( pixelPass );

//GUI


//CALLED ONLY ONCE
function Init()
{

}

//CALLED EVERY FRAME
function Update()
{
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

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
