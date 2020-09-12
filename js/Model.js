import * as THREE from '../lib/three/build/three.module.js';
import { Object } from './Object.js';
import { FBXLoader } from '../lib/three/examples/jsm/loaders/FBXLoader.js';

class Model
{
  // material = new THREE.MeshBasicMaterial();
  model = new THREE.Mesh();

  constructor(path)
  {
    this.path = path;
    this.geometry = new THREE.BoxBufferGeometry( 1,1,1 );
    this.material = new THREE.MeshBasicMaterial( {color: 0x00f2ff} );
    // this.model;
    // this.Load(path, scene);
  }

  Load(path)
  {
    let loader = new FBXLoader();
    loader.load(
      path,

      function(object)
      {
        this.model = new THREE.Mesh(object);
      }
    );
  }

  AssignModel( geometry, materials )
  {
  	// let material = new THREE.MeshFaceMaterial( materials );
  	// this.model.geometry = geometry;
  }
}

export { Model };
