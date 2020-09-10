import * as THREE from '../lib/three/build/three.module.js';
import { Object } from './Object.js';
import { FBXLoader } from '../lib/three/examples/jsm/loaders/FBXLoader.js';

class Model extends Object
{
  material = new THREE.MeshBasicMaterial();
  object;

  constructor(path, scene)
  {
    super();
    // this.box;
    // this.center;
    // this.material;
    // this.object;
    // this.Load(path, scene);
  }

  Load(path, scene)
  {
    let loader = new FBXLoader();
    loader.load( path, function ( object )
    {

      // if(shader == null)
      // {
        // this.material = new THREE.MeshBasicMaterial();
        // this.object = new THREE.Mesh(obj, this.material);
        // this.object = object;
        // this.box = new THREE.Box3().setFromObject( this.object );
        // this.center = new THREE.Vector3();
        // this.box.getCenter( this.center );
        // this.object.position.sub( this.center );
      // }

      scene.add( object );

    },

    // called when loading is in progresses
    function ( xhr ) {

      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    // called when loading has errors
    function ( error ) {

      console.log( 'An error happened' );
      console.log(error);
    }

  );
  }
}

export { Model };
