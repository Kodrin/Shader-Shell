// TO BE CONTINUED
import * as THREE from '../lib/three/build/three.module.js';
import { GUI } from '../lib/three/examples/jsm/libs/dat.gui.module.js';
import { ShellShader } from './ShellShader.js';
import { IncludeBase } from './cginclude/IncludeBase.js';


class ColorPrecision extends ShellShader
{
  PROPERTIES =
  {
    colorPrecision : 4.0,
  };


  //UNIFORMS constants
  uniforms =
  {
    "baseTexture": { value: null },
    "colorPrecision": { value: 5.17 },
  };

  constructor()
  {
    super();
    this.shaderMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: this.VertexPass(),
      fragmentShader: this.FragmentPass()
    });
  }

  FragmentPass()
  {
    return `
    uniform sampler2D baseTexture;
    uniform float colorPrecision;

    ${IncludeBase.Include()}

    varying vec2 vUv;

    void main()
    {
        vec4 base = texture2D(baseTexture, vUv);
        vec4 color = floor(base * colorPrecision) / colorPrecision;
        gl_FragColor = color;
    }
    `;
  }

  //UTILITIES
  BindToGUI(gui)
  {
    //customize what type of sliders u want here!!
    gui.add(this.PROPERTIES, 'colorPrecision').min( 0.5 ).max( 16 ).step( 0.01 );
  }

  // UpdateGUI()
  // {
  //   const properties = Object.entries(this.PROPERTIES);
  //   for (const [property, value] of properties)
  //   {
  //     this.uniforms[`${property}`].value = value;
  //   }
  // }

}

export { ColorPrecision };
