import * as THREE from '../lib/three/build/three.module.js';


class Object
{
  constructor(color = 0x00f2ff)
  {
    this.geometry = new THREE.BufferGeometry();
    this.material = new THREE.MeshBasicMaterial( {color: color} );
    this.object = new THREE.Mesh( this.geometry, this.material );
    // this.Init(this.object);
  }

  Init(object)
  {
    object.position.x = 0;
    object.position.y = 0;
    object.position.z = 0;
  }

  Move(direction = new THREE.Vector3(0,0,0), speed = 1)
  {
    this.object.position.x += direction.x * speed;
    this.object.position.y += direction.y * speed;
    this.object.position.z += direction.z * speed;
  }

  Rotate(axis = new THREE.Vector3(0,0,0), speed = 1)
  {
    this.object.rotation.x += axis.x * speed;
    this.object.rotation.y += axis.y * speed;
    this.object.rotation.z += axis.z * speed;
  }

  Debug(param)
  {
    console.log(param);
  }
}

export { Object };
