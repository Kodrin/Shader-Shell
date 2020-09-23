
/**
 * Pixelation shader
 */

let BasicDiffuse = {

	uniforms: {

		"baseTexture": { value: null }
	},

	vertexShader: [

		`
    varying highp vec2 vUv;

    void main()
    {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
    `

	].join( "\n" ),

	fragmentShader: [

		`
    uniform sampler2D baseTexture;

    varying vec2 vUv;

    void main()
    {
        gl_FragColor = texture2D(baseTexture, vUv); // Displays Nothing
        //gl_FragColor = vec4(0.5, 0.2, 1.0, 1.0); // Works; Displays Flat Color
    }
    `

	].join( "\n" )
};

export { BasicDiffuse };
