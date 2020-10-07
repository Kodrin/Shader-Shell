import * as THREE from '../lib/three/build/three.module.js';
import { ShaderPass } from '../lib/three/examples/jsm/postprocessing/ShaderPass.js';

//IMPLEMENTATION OF POST PROCESSING EFFECTS
class ShellPostProcess
{

  //UNIFORMS
  // tDiffuse = null;

  DEBUG = false;

  PROPERTIES =
  {
    grayscale : 1.0
  };

  uniforms =
  {
    "tDiffuse": { value: null },
    "resolution": { value: null },
    "grayscale": { value: 1.0 }
  };

  shaderMaterial = null;

  constructor()
  {
    this.shaderMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: this.VertexPass(),
      fragmentShader: this.FragmentPass()
    });
    this.shaderPass = new ShaderPass(this.ParseToThree());
  }


  //PASSES
  VertexPass()
  {
    return `
    varying highp vec2 vUv;

    void main()
    {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
    `;
  }

  GeometryPass()
  {
    return `
    `;
  }

  FragmentPass()
  {
    return `
    uniform sampler2D tDiffuse;
    uniform float grayscale;

    varying vec2 vUv;

    void main()
    {
        vec4 base = texture2D(tDiffuse, vUv); // Displays Nothing
        gl_FragColor = base + vec4(0.5, 0.2, 1.0, 1.0) * grayscale; // Works; Displays Flat Color
    }
    `;
  }

  //Will convert to the standard THREE.js Format
  //This is mostly for Post Processing effect to use with ShaderPass() since it require a specific format
  ParseToThree()
  {
    const shader =
    {
      uniforms : this.uniforms,
      vertexShader : [`${this.VertexPass()}`].join( "\n" ),
      fragmentShader : [`${this.FragmentPass()}`].join( "\n" )
    };

    // console.log(shader);
    return shader;
  }

  //UTILITIES
  BindToGUI(gui)
  {
    let folder = gui.addFolder('ShellPostProcess');
    folder.add(this.PROPERTIES, 'grayscale').min( 0.0 ).max( 1.0 ).step( 0.01 );
  }

  UpdateGUI()
  {
    const properties = Object.entries(this.PROPERTIES);
    for (const [property, value] of properties)
    {
      // this.uniforms[`${property}`].value = value;
      // this.shaderPass.uniforms[`${property}`].value = value;

      //NOTE: will need to add unique clauses for vector3 and 4s
      if(!this.DEBUG)
      {
        let propertyValue = value;

        if(propertyValue instanceof THREE.Vector2)
        {
          console.log(`${property} is Vector2`);
        }
        else if(propertyValue instanceof THREE.Vector3)
        {
          console.log(`${property} is Vector3`);
        }
        else if(propertyValue instanceof THREE.Vector4){
          console.log(`${property} is Vector4`);
        }

      }
      if(this.shaderPass.uniforms[`${property}`])
      {
        let shaderPropertyValue = this.shaderPass.uniforms[`${property}`].value;

      }

      // console.log(shaderPropertyValue);
    }

    this.DEBUG = true;
  }

}

export { ShellPostProcess };
