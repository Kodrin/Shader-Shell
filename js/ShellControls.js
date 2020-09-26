import { OrbitControls } from '../lib/three/examples/jsm/controls/OrbitControls.js';
import { FlyControls } from '../lib/three/examples/jsm/controls/FlyControls.js';
import { DragControls } from '../lib/three/examples/jsm/controls/DragControls.js';


const MOUSE_INPUTS =
{
  select: 'leftClick'
}

const KEY_INPUTS =
{
  Cube: '1',
  Sphere: '2',
  Custom: '3',
  ControlToggle: 'c',
  View: 'v',
  Debug: 'q'
};

class ShellControls
{
  /*
    WILL HANDLE ALL CONTROL INPUTS IN THE SHELL
  */

  orbitControls;

  constructor(camera, domElement)
  {
    this.orbitControls = new OrbitControls( camera, domElement );

    //add event listeners
    domElement.addEventListener( 'keydown', this.OnKeyDown.bind(this), false );

  }

  //will switch based on 1,2,3,4
  ModelSwitch()
  {

  }

  //toggle between basic, wireframe and shader
  MaterialViewSwitch()
  {

  }

  OnKeyDown( event )
  {
    switch (event.key)
    {
      case KEY_INPUTS.Cube:
        this.EventLog(event.key);
        break;
      case KEY_INPUTS.Sphere:
        this.EventLog(event.key);
        break;
      case KEY_INPUTS.Custom:
        this.EventLog(event.key);
        break;
      case KEY_INPUTS.ControlToggle:
        this.EventLog(event.key);
        break;
      case KEY_INPUTS.View:
        this.EventLog(event.key);
        break;
      case KEY_INPUTS.Debug:
        this.EventLog(event.key);
        break;
      default:

    }
  }

  EventLog(key)
  {
    console.log(`${key} has been pressed`);
  }
}

export { ShellControls };
