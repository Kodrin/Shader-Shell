// TO BE CONTINUED
import * as THREE from '../lib/three/build/three.module.js';
import { ShaderPass } from '../lib/three/examples/jsm/postprocessing/ShaderPass.js';
import { ShellPostProcess } from './ShellPostProcess.js';
import { Common } from '../js/Common.js';
import { NoiseInclude } from './cginclude/NoiseInclude.js'


class PixelateEffect extends ShellPostProcess
{
  //Im following the data.gui format here
  PROPERTIES =
  {
    pixelSize: 1. ,
		flowScale: 1. ,
    colorA : [1.0,0.0,0.0],
    colorB : [1.000,0.620,0.788],

    TestVec2 : new THREE.Vector2(1,1),
    TestVec3 : new THREE.Vector3(1,1,1),
    TestVec4 : new THREE.Vector4(1,1,1,1)
  };


  //UNIFORMS constants
  uniforms =
  {
    "tDiffuse": { value: null },
		"resolution": { value: null },
		"pixelSize": { value: 1. },
		"flowScale": { value: 1. },
    "colorA" : { value : new THREE.Vector3(0.266,0.735,0.912)},
    "colorB" : { value: new THREE.Vector3(1.000,0.620,0.788)},
    "test" : { value: new THREE.Vector2(1.000,0.620)}
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
    uniform vec3 colorA;
    uniform vec3 colorB;

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

    //gl_FragColor = vec4(colorA,1.0);
    vec4 tex = texture2D(tDiffuse, coord);
    if(tex.b > 0.0) {
      gl_FragColor = vec4(color,1.0);
    } else {
    gl_FragColor = vec4(0);
    }


    // gl_FragColor = texture2D(tDiffuse, coord);

    }
    `;
  }

  //UTILITIES
  //note: can distinguidh color and vector3 by array vs THREE.vector
  BindToGUI(gui)
  {
    //customize what type of sliders u want here!!
    let folder = gui.addFolder('Pixelation Effect');
    folder.add(this.PROPERTIES, 'pixelSize').min( 0.5 ).max( 16 ).step( 0.01 );
    folder.addColor(this.PROPERTIES, 'colorA').onChange(
      function( rgb )
      {
        //Converting to normalized values
        let colorValue = new THREE.Vector3(rgb[0],rgb[1],rgb[2]);
        // colorValue.x = rgb[0]/255;
        // colorValue.y = rgb[1]/255;
        // colorValue.z = rgb[2]/255;
        this.uniforms[`colorA`].value = Common.NormalizeColor(colorValue);
        this.shaderPass.uniforms[`colorA`].value = Common.NormalizeColor(colorValue);
        // console.log(this.uniforms[`colorA`].value);
      }.bind(this)
    );
    folder.addColor(this.PROPERTIES, 'colorB');

    let subfolder = folder.addFolder('Vector4');
    subfolder.add(this.PROPERTIES, 'pixelSize').min( 0.5 ).max( 16 ).step( 0.01 );
    // folder.add(this.PROPERTIES, 'test');
    // gui.add(this.PROPERTIES, 'pixelSize').min( 0.5 ).max( 16 ).step( 0.01 );
  }

}

export { PixelateEffect };
