import * as THREE from '../lib/three/build/three.module.js';


class Object
{
  LOADED = false;

  constructor()
  {
    this.geometry = new THREE.BufferGeometry();
    this.material = new THREE.MeshBasicMaterial( {color: 0x00f2ff} );
    this.object = new THREE.Mesh( this.geometry, this.material );
    // this.Init(this.object);
  }

  Init(object)
  {
    this.object.position.x = 0;
    this.object.position.y = 0;
    this.object.position.z = 0;
  }

  Move(direction = new THREE.Vector3(0,0,0), speed = 1)
  {
    if(this.LOADED)
    {
      this.object.position.x += direction.x * speed;
      this.object.position.y += direction.y * speed;
      this.object.position.z += direction.z * speed;
    }
  }

  Rotate(axis = new THREE.Vector3(0,0,0), speed = 1)
  {
    if(this.LOADED)
    {
      this.object.rotation.x += axis.x * speed;
      this.object.rotation.y += axis.y * speed;
      this.object.rotation.z += axis.z * speed;
    }
  }

  SetVisible(visibility)
  {
    this.object.visible = visibility;
  }

  AddToScene(scene)
  {
    scene.add(this.object);
    this.LOADED = true;
  }

  Debug(param)
  {
    console.log(param);
  }
}

export { Object };
