import * as THREE from '../lib/three/build/three.module.js';

import { GUI } from '../lib/three/examples/jsm/libs/dat.gui.module.js';

import { OrbitControls } from '../lib/three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from '../lib/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../lib/three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from '../lib/three/examples/jsm/postprocessing/ShaderPass.js';




class Shell
{

  constructor()
  {
    this.container = document.getElementById( 'canvas' );
    // this.scene = new THREE.Scene();
    // this.camera = new THREE.PerspectiveCamera( 75, SETTINGS.width / SETTINGS.height, 0.1, 1000 );
    // this.renderer = new THREE.WebGLRenderer({ antialias : SETTINGS.antialias, canvas: container });
    this.gui = new GUI();
  }

  //CALLED ONCE AT THE BEGINNING
  Init()
  {
    console.log("Initialized..");
  }

  //EVERY FRAME
  Update()
  {
    UpdateGUI();
  }

  //GUI FOR SETTING PARAMS ON SHADER
  UpdateGUI()
  {

  }

  UpdateControls()
  {

  }

  //RUNS THE LOOP
  Animate()
  {
    Update();
  }
}

export { Shell };
