//This is to work with libraries
/*
  Include files are a common way of reusing code in shaders
  Just write a function, put shader code in interval
  then include it in whatever pass you want in your shader
*/

class IncludeBase
{
  //call it whatever
  static Include()
  {
    return `
      //Hello world!!!!
      //this is an include file
      //ITS WORKING!!!
    `;
  }


  static IncludeNoise()
  {

  }
}

export { IncludeBase };
