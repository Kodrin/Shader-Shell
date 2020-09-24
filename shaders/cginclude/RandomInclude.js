import { IncludeBase } from './IncludeBase.js'

class RandomInclude extends IncludeBase
{
  static Include()
  {
    return `
    float random (in vec2 st) {
        return fract(sin(dot(st.xy,
                             vec2(12.9898,78.233)))
                     * 43758.5453123);
    }
    `;
  }
}

export { RandomInclude };
