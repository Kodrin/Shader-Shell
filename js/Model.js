import * as THREE from '../lib/three/build/three.module.js';
import { Object } from './Object.js';
import { FBXLoader } from '../lib/three/examples/jsm/loaders/FBXLoader.js';

class Model
{
  LOADED = false;

  gltfanimations; // Array<THREE.AnimationClip>
	gltfscene; // THREE.Group
	gltfscenes; // Array<THREE.Group>
	gltfcameras; // Array<THREE.Camera>
	gltfasset; // Object

  textures =
  {
    diffuse: "preset",
    roughness: "preset",
    specular: "preset",
    emissive: "preset",
    normal: "preset",
    height: "preset"
  }

  materials =
  {
    mat1: "preset",
    mat2: "preset",
    mat3: "preset",
    mat4: "preset"
  }
  material;
  shader;
  object;

  constructor(path, shader)
  {
    this.path = path;
    // this.geometry = new THREE.BoxBufferGeometry( 1,1,1 );
    // this.mat = new THREE.MeshBasicMaterial( {color: 0x00f2ff} );
    // this.shader = shader;
    // this.shaderMaterial = new THREE.ShaderMaterial({
    //   uniforms: shader.uniforms,
    //   vertexShader: shader.VertexPass(),
    //   fragmentShader: shader.FragmentPass()
    // });
    // console.log(this.shaderMaterial);
    // this.model;
  }

  //https://stackoverflow.com/questions/16200082/assigning-materials-to-an-objloader-model-in-three-js
  Load(loader, scene, material)
  {
    // let loader = new FBXLoader();
    loader.load( this.path,
        function( obj ){
            obj.traverse( function( child ) {
                if ( child instanceof THREE.Mesh ) {
                    child.material = material;
                    // console.log(child.material);
                }
            } );
            scene.add( obj );
        },
        function( xhr ){
            console.log( (xhr.loaded / xhr.total * 100) + "% loaded")
        },
        function( err ){
            console.error( "Error loading FBX")
        }
    );
  }

  LoadGLTF(loader, scene, material)
  {
    //USE THE LAODER
    loader.load(
      this.path,
      HandleObject.bind(this),
      HandleLoading,
      HandleError
    );

    function HandleObject(gltf)
    {
      this.gltfanimations = gltf.animations;
      this.gltfscene = gltf.scene;
      this.gltfscenes = gltf.scenes;
      this.gltfcameras = gltf.cameras;
      this.gltfasset = gltf.asset;

      console.log(this.gltfscene);


      gltf.scene.scale.set(100,100,100);
      // this.object.bind(this);
      this.object = gltf.scene;
      console.log(this.object);
      gltf.scene.traverse( function( child ) {
          if ( child instanceof THREE.Mesh ) {
              // child.material = material;
              // console.log(child.material);
          }
      } );

    	scene.add( gltf.scene );
      this.LOADED = true;
    }

    function HandleLoading(xhr)
    {
  		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    }

    function HandleError(error)
    {
      console.log("Error Loading model");
    }

  }

  AssignModel( geometry, materials )
  {
  	// let material = new THREE.MeshFaceMaterial( materials );
  	// this.model.geometry = geometry;
  }

  SwitchMaterial(material)
  {
    // console.log(this.gltfscene);
    if(this.LOADED)
    {
      this.gltfscene.traverse( function( child ) {
          if ( child instanceof THREE.Mesh ) {
              child.material = material;
              // console.log(child.material);
          }
      } );
    }
  }

  Move(direction = new THREE.Vector3(0,0,0), speed = 1)
  {
    if(this.LOADED)
    {
      this.object.position.x += direction.x * speed;
      this.object.position.y += direction.y * speed;
      this.object.position.z += direction.z * speed;
    }
  }

  Rotate(axis = new THREE.Vector3(0,0,0), speed = 1)
  {
    if(this.LOADED)
    {
      this.object.rotation.x += axis.x * speed;
      this.object.rotation.y += axis.y * speed;
      this.object.rotation.z += axis.z * speed;
    }
  }



}

export { Model };
