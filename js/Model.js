import * as THREE from '../lib/three/build/three.module.js';
import { Object } from './Object.js';
import { FBXLoader } from '../lib/three/examples/jsm/loaders/FBXLoader.js';

class Model
{
  model = new THREE.Mesh();
  constructor(path, shader)
  {
    this.path = path;
    // this.geometry = new THREE.BoxBufferGeometry( 1,1,1 );
    // this.mat = new THREE.MeshBasicMaterial( {color: 0x00f2ff} );
    // this.shader = shader;
    // this.shaderMaterial = new THREE.ShaderMaterial({
    //   uniforms: shader.uniforms,
    //   vertexShader: shader.VertexPass(),
    //   fragmentShader: shader.FragmentPass()
    // });
    // console.log(this.shaderMaterial);
    // this.model;
  }

  //https://stackoverflow.com/questions/16200082/assigning-materials-to-an-objloader-model-in-three-js
  Load(loader, scene, material)
  {
    // let loader = new FBXLoader();
    loader.load( this.path,
        function( obj ){
            obj.traverse( function( child ) {
                if ( child instanceof THREE.Mesh ) {
                    child.material = material;
                    // console.log(child.material);
                }
            } );
            scene.add( obj );
        },
        function( xhr ){
            console.log( (xhr.loaded / xhr.total * 100) + "% loaded")
        },
        function( err ){
            console.error( "Error loading FBX")
        }
    );
  }

  AssignModel( geometry, materials )
  {
  	// let material = new THREE.MeshFaceMaterial( materials );
  	// this.model.geometry = geometry;
  }

  SwitchMaterial(material)
  {

  }


}

export { Model };
