import { Vector2, Vector3, Vector4} from '../lib/three/build/three.module.js';

class Common
{
  static NormalizeColor(color)
  {
    if(color instanceof Vector3)
    {
      let normalized = new Vector3(0,0,0);
      normalized.x = color.x/255;
      normalized.y = color.y/255;
      normalized.z = color.z/255;
      return normalized;
    }
    else if (color instanceof Vector4)
    {
      let normalized = new Vector4(0,0,0,0);
      normalized.x = color.x/255;
      normalized.y = color.y/255;
      normalized.z = color.z/255;
      normalized.w = color.z/255;
      return normalized;
    }
    else
    {
      console.warn("Color is not an instance of Vec3 or Vec4, cannot normalize");
    }
  }
}

export { Common };
