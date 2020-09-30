import * as THREE from '../lib/three/build/three.module.js';
import { Object } from './Object.js';
import { FBXLoader } from '../lib/three/examples/jsm/loaders/FBXLoader.js';

class Model extends Object
{
  LOADED = false;

  gltfanimations; // Array<THREE.AnimationClip>
	gltfscene; // THREE.Group
	gltfscenes; // Array<THREE.Group>
	gltfcameras; // Array<THREE.Camera>
	gltfasset; // Object

  modelPath;
  texturePath;

  material;
  shader;
  object;

  textures =
  {
    diffuse: THREE.ImageUtils.loadTexture('../assets/models/textures/lambert1_baseColor.png'),
    roughness: this.GetTexture('../assets/models/textures/roughness.png'),
    specular: this.GetTexture('../assets/models/textures/specular.png'),
    emissive: this.GetTexture('../assets/models/textures/emissive.png'),
    normal: this.GetTexture('../assets/models/textures/normal.png'),
    height: this.GetTexture('../assets/models/textures/height.png')
  }

  materials =
  {
    unlitMaterial: new THREE.MeshBasicMaterial( {
      color: 0x00f2ff
    } ),
    basicMaterial: new THREE.MeshBasicMaterial(),
    wireframeMaterial: new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        wireframe: true,
        shininess: 100,
        specular: 0x000, emissive: 0x000,
        flatShading: false, depthWrite: true, depthTest: true
    }),
    phongMaterial: new THREE.MeshPhongMaterial({
        color: 0x555555,
        specular: 0xffffff,
        shininess: 10,
        flatShading: false,
        side: THREE.DoubleSide,
        skinning: true
    }),
  }


  constructor(path)
  {
    super();
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
    console.log(this.textures.diffuse);
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

      // console.log(this.gltfscene);


      gltf.scene.scale.set(100,100,100);
      // this.object.bind(this);
      this.object = gltf.scene;
      // console.log(this.object);
      gltf.scene.traverse( function( child ) {
          if ( child instanceof THREE.Mesh ) {
              child.material = material;

              //Check if there is a custom shader to it
              if('shaderMaterial' in this.materials)
              {
                child.material = this.materials.shaderMaterial;
              }
              // console.log(child.material);
          }
      }.bind(this) );

    	scene.add( gltf.scene );
      this.LOADED = true;
    }

    function HandleLoading(xhr)
    {
  		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    }

    function HandleError(error)
    {
      console.log(error);
      console.log("Error Loading model");
    }

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

  GetTexture(path)
  {
    try {
      // console.log(`Loaded Texture from ${path}`);
      return THREE.ImageUtils.loadTexture(path);
    } catch (e) {
      // console.log("Texture not found ");
      return null;
    } finally {
      // console.log("Texture not found ");
      return null;
    }
  }

  // Move(direction = new THREE.Vector3(0,0,0), speed = 1)
  // {
  //   if(this.LOADED)
  //   {
  //     this.object.position.x += direction.x * speed;
  //     this.object.position.y += direction.y * speed;
  //     this.object.position.z += direction.z * speed;
  //   }
  // }
  //
  // Rotate(axis = new THREE.Vector3(0,0,0), speed = 1)
  // {
  //   if(this.LOADED)
  //   {
  //     this.object.rotation.x += axis.x * speed;
  //     this.object.rotation.y += axis.y * speed;
  //     this.object.rotation.z += axis.z * speed;
  //   }
  // }



}

export { Model };
