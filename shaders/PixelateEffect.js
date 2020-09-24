// TO BE CONTINUED
import * as THREE from '../lib/three/build/three.module.js';
import { ShaderPass } from '../lib/three/examples/jsm/postprocessing/ShaderPass.js';
import { ShellPostProcess } from './ShellPostProcess.js';
import { NoiseInclude } from './cginclude/NoiseInclude.js'


class PixelateEffect extends ShellPostProcess
{
  PROPERTIES =
  {
    pixelSize: 1. ,
		flowScale: 1.
  };


  //UNIFORMS constants
  uniforms =
  {
    "tDiffuse": { value: null },
		"resolution": { value: null },
		"pixelSize": { value: 1. },
		"flowScale": { value: 1. }
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

		void main() {

  		vUv = uv;
  		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
    `;
  }

  FragmentPass()
  {
    return `
    vec3 colorA = vec3(0.266,0.735,0.912);
    vec3 colorB = vec3(1.000,0.620,0.788);

    uniform sampler2D tDiffuse;
    uniform float pixelSize;
    uniform vec2 resolution;
    uniform float u_time;


    varying highp vec2 vUv;

    //Include noise functions
    ${NoiseInclude.Include()}

    void main(){

    vec2 st = gl_FragCoord.xy/resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.x);
    vec2 pos = vec2(st*5.0);
    float n = noise(pos);

    color = mix(colorA, colorB, n);

    vec2 dxy = pixelSize / resolution;
    vec2 coord = dxy * floor( vUv / dxy );

    vec4 tex = texture2D(tDiffuse, coord);
    if(tex.b > 0.0) {
      gl_FragColor = vec4(color,1.0);
    } else {
    gl_FragColor = vec4(0);
    }


    // gl_FragColor = vec4(color,1.0);
    // gl_FragColor = texture2D(tDiffuse, coord);

    }
    `;
  }

  //UTILITIES
  BindToGUI(gui)
  {
    //customize what type of sliders u want here!!
    let folder = gui.addFolder('Pixelation Effect');
    folder.add(this.PROPERTIES, 'pixelSize').min( 0.5 ).max( 16 ).step( 0.01 );
    // gui.add(this.PROPERTIES, 'pixelSize').min( 0.5 ).max( 16 ).step( 0.01 );
  }

}

export { PixelateEffect };
