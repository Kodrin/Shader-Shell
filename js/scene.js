import * as THREE from '../lib/three/build/three.module.js';

import { GUI } from '../lib/three/jsm/libs/dat.gui.module.js';

import { TrackballControls } from '../lib/three/jsm/controls/TrackballControls.js';
import { EffectComposer } from '../lib/three/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../lib/three/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from '../lib/three/jsm/postprocessing/ShaderPass.js';
import { PixelShader } from '../lib/three/jsm/shaders/PixelShader.js';



var container = document.getElementById( "canvas" );
console.log(container);
// document.body.appendChild( container );

//common
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, 600 / 600, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({ antialias: true, canvas: container });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( 600,600);
// container.appendChild( renderer.domElement );
var composer = new THREE.EffectComposer( renderer );

//box
var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
var wireframe = new THREE.WireframeGeometry( geometry );
var cube = new THREE.LineSegments( wireframe );
scene.add( cube );

//custom mesh
var customGeometry = new THREE.BufferGeometry();
var vertices = new Float32Array( [
	-1.0, -1.0,  1.0,
	 1.0, -1.0,  1.0,
	 1.0,  1.0,  1.0,

	 1.0,  1.0,  1.0,
	-1.0,  1.0,  1.0,
	-1.0, -1.0,  1.0
] );

count = 0;
vector = [];
// for (var i = 0; i < vertices.length; i++) {
//   vertices[i] *= Math.random();
// }

// itemSize = 3 because there are 3 values (components) per vertex
customGeometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
var material = new THREE.WireframeGeometry( customGeometry );
var mesh = new THREE.LineSegments(material );
// scene.add(mesh);

// for (var x = 0; x < 1/0.05; x+= 1/0.05) {
//   for (var y = 0; y < 1/0.05; y+= 1/0.05) {
//     for (var z = 0; z < 1/0.05; z+= 1/0.05) {
//       var geometry = new THREE.BoxBufferGeometry( x, y, z );
//       var wireframe = new THREE.WireframeGeometry( geometry );
//       var cube = new THREE.LineSegments( wireframe );
//       cube.position.x = x;
//       cube.position.y = y;
//       cube.position.z = z;
//
//       scene.add( cube );
//     }
//   }
// }

//camera
camera.position.z = 2.5;

//animate
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // mesh.rotation.x += 0.01;
}
animate();
