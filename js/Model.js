import * as THREE from '../lib/three/build/three.module.js';
import { Object } from './Object.js';
import { FBXLoader } from '../lib/three/examples/jsm/loaders/FBXLoader.js';

class Model
{
  constructor(path, scene)
  {
    this.Load(path, scene);
  }

  Load(path, scene)
  {
    let loader = new FBXLoader();
    loader.load( path, function ( object ) {

      // object.traverse( function ( child ) {
      //
      //   if ( child.isMesh ) {
      //
      //     child.castShadow = true;
      //     child.receiveShadow = true;
      //
      //   }
      //
      // } );

      scene.add( object );

    } );
  }
}

export { Model };
