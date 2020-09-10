import * as THREE from '../lib/three/build/three.module.js';
import { Object } from './Object.js';


class Cube extends Object
{
  constructor(dimensions = new THREE.Vector3(1,1,1), color = 0x00f2ff)
  {
    super();
    this.geometry = new THREE.BoxBufferGeometry( dimensions.x,dimensions.y,dimensions.z );
    this.material = new THREE.MeshBasicMaterial( {color: color} );
    this.object = new THREE.Mesh( this.geometry, this.material );
  }
}

class Sphere extends Object
{
  constructor(radius = 1, widthSegments = 32, heightSegments = 32, color = 0x00f2ff)
  {
    super();
    this.geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments );
    this.material = new THREE.MeshBasicMaterial( {color: color} );
    this.object = new THREE.Mesh( this.geometry, this.material );
  }
}

class CubeShader extends Object
{
  constructor(dimensions = new THREE.Vector3(1,1,1), shader = null)
  {
    super();
    this.geometry = new THREE.BoxBufferGeometry( dimensions.x,dimensions.y,dimensions.z  );
    this.material;

    if(shader != null)
    {
      this.material = new THREE.ShaderMaterial( {
        uniforms: shader.uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader
      } );
    }
    else
    {
      this.material = new THREE.MeshBasicMaterial( {color: 0x00f2ff} );
    }

    this.object = new THREE.Mesh( this.geometry, this.material );
  }

}

export { Cube };
export { Sphere };
export { CubeShader };
