// TO BE CONTINUED
import { ShaderMaterial } from '../lib/three/build/three.module.js';

class ShellShader
{
  //UNIFORMS
  tDiffuse = null;
  resolution = null;
  pixelSize = 1.0;
  flowScale = 1.0;

  constructor()
  {

  }

  Uniforms()
  {

  }

  VertexPass()
  {
    return
    `
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
    return
    `
    `;
  }

  FragmentPass()
  {
    return
    `
    uniform float height;
		uniform vec2 resolution;
		uniform sampler2D heightMap;

		varying vec2 vUv;

		void main()
    {
			float val = texture2D( heightMap, vUv ).x;

			float valU = texture2D( heightMap, vUv + vec2( 1.0 / resolution.x, 0.0 ) ).x;
			float valV = texture2D( heightMap, vUv + vec2( 0.0, 1.0 / resolution.y ) ).x;

			gl_FragColor = vec4( ( 0.5 * normalize( vec3( val - valU, val - valV, height  ) ) + 0.5 ), 1.0 );
		}
    `;
  }

}

export { ShellShader };
