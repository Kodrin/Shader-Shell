import * as THREE from '../lib/three/build/three.module.js';

class Helpers
{
  showAxes = true;
  axes = new THREE.AxesHelper( 500 );
  grid = new THREE.GridHelper( 1000, 10 );


  ToggleAxes()
  {
    this.axes.visible = !this.axes.visible;
  }

  ToggleGrid()
  {
    this.grid.visible = !this.grid.visible;
  }

  ToggleAll()
  {

  }

  AddToScene(scene)
  {
    scene.add(this.axes);
    scene.add(this.grid);
  }

  //using dat.gui.module.js
  BindToGUI(gui)
  {
    let folder = gui.addFolder('Helpers');
    folder.add( this, 'ToggleAxes' );
    folder.add( this, 'ToggleGrid' );
  }

  UpdateGUI()
  {

  }
}

export { Helpers };
