import * as THREE from '../lib/three/build/three.module.js';
import { Object } from './Object.js';


class Cube extends Object
{
  constructor(dimensions = new THREE.Vector3(1,1,1), color = 0x00f2ff)
  {
    super(color);
    this.geometry = new THREE.BoxBufferGeometry( dimensions.x,dimensions.y,dimensions.z );
    this.material = new THREE.MeshBasicMaterial( {color: color} );
    this.object = new THREE.Mesh( this.geometry, this.material );
  }
}

class Sphere extends Object
{
  constructor(radius = 1, widthSegments = 32, heightSegments = 32, color = 0x00f2ff)
  {
    super(color);
    this.geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments );
    this.material = new THREE.MeshBasicMaterial( {color: color} );
    this.object = new THREE.Mesh( this.geometry, this.material );
  }
}

export { Cube };
export { Sphere };
