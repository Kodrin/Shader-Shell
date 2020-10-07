// TO BE CONTINUED
import * as THREE from '../lib/three/build/three.module.js';
import { ShaderPass } from '../lib/three/examples/jsm/postprocessing/ShaderPass.js';
import { ShellPostProcess } from './ShellPostProcess.js';
import { Common } from '../js/Common.js';
import { NoiseInclude } from './cginclude/NoiseInclude.js'


class NormalPass extends ShellPostProcess
{
  //Im following the data.gui format here
  PROPERTIES =
  {
  };


  //UNIFORMS constants
  uniforms =
  {
    "tDiffuse": { value: null },
		"resolution": { value: null },
  };

  constructor(window)
  {
    super();
    this.shaderMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: this.VertexPass(),
      fragmentShader: this.FragmentPass()
    });
    this.shaderPass = new ShaderPass(this.ParseToThree());

    //INITIALIZING VALUES
    this.shaderPass.uniforms[ "resolution" ].value = new THREE.Vector2( window.innerWidth, window.innerHeight );
    this.shaderPass.uniforms[ "resolution" ].value.multiplyScalar( window.devicePixelRatio );
  }

  VertexPass()
  {
    return `
    varying highp vec2 vUv;
    varying vec3 vNormal; //need to declare normal in vertex also

		void main() {

  		vUv = uv;
  		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      vNormal = normalize( normalMatrix * normal );
    }
    `;
  }

  FragmentPass()
  {
    return `

    //uniforms
    uniform sampler2D tDiffuse; //screen texture
    uniform float pixelSize;
    uniform vec2 resolution;
    uniform float u_time;

    //varyings
    varying highp vec2 vUv; //screen uvs
    varying vec3 vNormal;

    void main(){

    vec2 coord = vUv;

    //gl_FragColor = vec4(colorA,1.0);
    vec4 tex = texture2D(tDiffuse, coord);

     gl_FragColor = tex * vec4(1,0,0,0);
    //gl_FragColor = vec4(vNormal,1);

    }
    `;
  }

  //UTILITIES
  //note: can distinguidh color and vector3 by array vs THREE.vector
  BindToGUI(gui)
  {

  }

}

export { NormalPass };
