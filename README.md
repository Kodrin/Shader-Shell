# Shader-Shell

### TODO

**Design**
1. Adjustable window params
2. Shader info

**Code Design:**
1. Folder Structure
2. ~~GLSL Support/Parsing (JSON format is disgusting)~~
3. ~~CG include files parsed into strings~~
4. ~~Find a way to parse shader structure back into Three js shader for post processing compatibility~~
5. Parsing to GLSL file

**Structs:**
1. ~~Spheres~~
2. Models obj
3. ~~Camera~~
4. ~~Helpers~~
5. ~~GUI categorization~~

**UI Design**
1. ~~Helper params~~
2. ~~Shader Params~~

### Purpose
I've been pretty frustrated with the lack of tools to quickly iterate shaders. Simply put, I don't want to have to write boilerplate code, install endless Dependencies or setup a custom IDE just to write basic GLSL code and preview it.

ShaderShell solves that by:
1- Providing a simple environment with minimal dependencies out of the package. No boilerplate needed, everything is provided and you just create a ShellShader instance to code your GLSL shader.
2- A way to code material and post postprocessing shaders in a 3D environment.
3- A minimal interface to debug your parameters and quickly interface with your shader.
4- Being a completely front-end compatible solution. No Node js or npm install needed. You just open up the browser and it works!


### Dependencies
- Three.js R120
- dat.gui
