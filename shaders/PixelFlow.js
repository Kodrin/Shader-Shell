
/**
 * Pixelation shader
 */

let PixelFlow = {

	uniforms: {

		"tDiffuse": { value: null },
		"resolution": { value: null },
		"pixelSize": { value: 1. },
		"flowScale": { value: 1. },
	},

	vertexShader: [

		`varying highp vec2 vUv;

		void main() {

		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

  }`

	].join( "\n" ),

	fragmentShader: [

    `vec3 colorA = vec3(0.266,0.735,0.912);
    vec3 colorB = vec3(1.000,0.620,0.788);

		uniform sampler2D tDiffuse;
		uniform float pixelSize;
		uniform vec2 resolution;
    uniform float u_time;


		varying highp vec2 vUv;


    float random (in vec2 st) {
        return fract(sin(dot(st.xy,
                             vec2(12.9898,78.233)))
                     * 43758.5453123);
    }

    float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
    }

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

	}`

	].join( "\n" )
};

export { PixelFlow };
