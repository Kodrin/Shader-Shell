// TO BE CONTINUED
/*
NOTES:
dat gui color doesnt work with vec3
need to find a way to add vectors to gui

*/
import * as THREE from '../lib/three/build/three.module.js';

class ShellShader
{
  //UNIFORMS
  // baseTexture = null;

  PROPERTIES =
  {

  };

  uniforms =
  {
    "baseTexture": { value: null }
  };

  shaderMaterial = null;

  constructor()
  {
    this.shaderMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: this.VertexPass(),
      fragmentShader: this.FragmentPass()
    });
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
    uniform sampler2D baseTexture;

    varying vec2 vUv;

    void main()
    {
        gl_FragColor = texture2D(baseTexture, vUv); // Displays Nothing
        //gl_FragColor = vec4(0.5, 0.2, 1.0, 1.0); // Works; Displays Flat Color
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

  }

  UpdateGUI()
  {
    const properties = Object.entries(this.PROPERTIES);
    for (const [property, value] of properties)
    {
      this.uniforms[`${property}`].value = value;
    }
  }

}

export { ShellShader };
