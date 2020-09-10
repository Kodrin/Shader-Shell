import * as THREE from '../lib/three/build/three.module.js';

class CameraSettings
{
  constructor()
  {
    this.focal = 75;
    this.width = 600;
    this.height = 600;
    this.near = 0.1;
    this.far = 1000;
  }
}

class Camera
{
  constructor(focal = 75, width = 600, height = 600, near = 0.1, far = 1000)
  {
    this.camera = new THREE.PerspectiveCamera( focal, width / height, near, far );
  }

  AddLight(light)
  {
    this.camera.add(light);
  }

  RemoveLight(light)
  {
    this.camera.remove(light);
  }
}

export { CameraSettings };
export { Camera };
