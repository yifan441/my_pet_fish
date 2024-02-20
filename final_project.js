import { defs, tiny } from './examples/common.js';

const {
  Vector, Vector3, vec, vec3, vec4, color, hex_color, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

/////////////////////////////////////////////
///////    SHAPE DEFINITIONS      ///////////
/////////////////////////////////////////////

class Cube extends Shape {
  constructor() {
      super("position", "normal",);
      // Loop 3 times (for each axis), and inside loop twice (for opposing cube sides):
      this.arrays.position = Vector3.cast(
          [-1, -1, -1], [1, -1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, -1], [-1, 1, -1], [1, 1, 1], [-1, 1, 1],
          [-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1], [1, -1, 1], [1, -1, -1], [1, 1, 1], [1, 1, -1],
          [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1], [1, -1, -1], [-1, -1, -1], [1, 1, -1], [-1, 1, -1]);
      this.arrays.normal = Vector3.cast(
          [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
          [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
          [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]);
      // Arrange the vertices into a square shape in texture space too:
      this.indices.push(0, 1, 2, 1, 3, 2, 4, 5, 6, 5, 7, 6, 8, 9, 10, 9, 11, 10, 12, 13,
          14, 13, 15, 14, 16, 17, 18, 17, 19, 18, 20, 21, 22, 21, 23, 22);
  }
}

class Cube_Outline extends Shape {
  constructor() {
      super("position", "color");
      // DONE: (Requirement 5).
      // When a set of lines is used in graphics, you should think of the list entries as
      // broken down into pairs; each pair of vertices will be drawn as a line segment.
      // Note: since the outline is rendered with Basic_shader, you need to redefine the position and color of each vertex
      this.arrays.position = Vector3.cast(
          [-1, -1, -1], [1, -1, -1], 
          [-1, -1, 1], [1, -1, 1], 
          [1, 1, -1], [-1, 1, -1], 
          [1, 1, 1], [-1, 1, 1],
          [-1, -1, -1], [-1, -1, 1], 
          [-1, 1, -1], [-1, 1, 1], 
          [1, -1, 1], [1, -1, -1], 
          [1, 1, 1], [1, 1, -1],
          [-1, -1, -1], [-1, 1, -1],
          [1, -1, -1], [1, 1, -1],
          [1, 1, 1], [1, -1, 1],
          [-1, 1, 1], [-1, -1, 1]
      );
      this.arrays.color = [ 
          vec4(1,1,1,1), vec4(1,1,1,1), 
          vec4(1,1,1,1), vec4(1,1,1,1), 
          vec4(1,1,1,1), vec4(1,1,1,1), 
          vec4(1,1,1,1), vec4(1,1,1,1),
          vec4(1,1,1,1), vec4(1,1,1,1), 
          vec4(1,1,1,1), vec4(1,1,1,1), 
          vec4(1,1,1,1), vec4(1,1,1,1), 
          vec4(1,1,1,1), vec4(1,1,1,1),
          vec4(1,1,1,1), vec4(1,1,1,1), 
          vec4(1,1,1,1), vec4(1,1,1,1), 
          vec4(1,1,1,1), vec4(1,1,1,1), 
          vec4(1,1,1,1), vec4(1,1,1,1)
      ]
      this.indices = false;
  }
}

class Cube_Single_Strip extends Shape {
  constructor() {
      super("position", "normal");
      // DONE: (Requirement 6)

      this.arrays.position = Vector3.cast(
          [-1,-1,1], [-1,1,1], [1,1,1], [1,-1,1], 
          [-1,-1,-1], [1,-1,-1], [-1,1,-1], [1,1,-1]
      );
      this.arrays.normal = Vector3.cast(
          [-1,-1,1], [-1,1,1], [1,1,1], [1,-1,1], 
          [-1,-1,-1], [1,-1,-1], [-1,1,-1], [1,1,-1]
      );
      this.indices.push(
          0,1,3,
          1,2,3,
          3,2,5,
          5,2,7,
          6,7,5,
          6,4,5,
          6,4,1,
          1,4,0,
          4,0,3,
          4,5,3,
          6,1,2,
          6,7,2
      )
  }
}

class Fishtank_Base extends Shape {
    constructor() {
        super("position", "normal");
        this.arrays.position = Vector3.cast(
            [-28, -2, 10], [-28, 2, 10], [28, -2, 10], [28, 2, 10], // front face
            [-28, -2, -10], [-28, 2, -10], [28, -2, -10], [28, 2, -10], // back face
            [-28, 2, 10], [-28, -2, 10], [-28, 2, -10], [-28, -2, -10], // left face
            [28, 2, 10], [28, -2, 10], [28, 2, -10], [28, -2, -10], // right face
            [-28, 2, 10], [-28, 2, -10], [28, 2, 10], [28, 2, -10], // top face
            [-28, -2, 10], [-28, -2, -10], [28, -2, 10], [28, -2, -10], // bottom face
        )
        this.arrays.normal = Vector3.cast(); // normals???
        this.indices.push(0, 1, 2, 1, 3, 2, 4, 5, 6, 5, 7, 6, 8, 9, 10, 9, 11, 10, 12, 13,
            14, 13, 15, 14, 16, 17, 18, 17, 19, 18, 20, 21, 22, 21, 23, 22);
    }
}

class Fishtank_Wall extends Shape {
    constructor() {
        super("position", "normal");
        this.arrays.position = Vector3.cast(
            [-3, -10, 10], [-3, 10, 10], [3, -10, 10], [3, 10, 10], // front face
            [-3, -10, -10], [-3, 10, -10], [3, -10, -10], [3, 10, -10], // back face
            [-3, 10, 10], [-3, -10, 10], [-3, 10, -10], [-3, -10, -10], // left face
            [3, 10, 10], [3, -10, 10], [3, 10, -10], [3, -10, -10], // right face
            [-3, 10, 10], [-3, 10, -10], [3, 10, 10], [3, 10, -10], // top face
            [-3, -10, 10], [-3, -10, -10], [3, -10, 10], [3, -10, -10], // bottom face
        )
        this.arrays.normal = Vector3.cast(); // normals???
        this.indices.push(0, 1, 2, 1, 3, 2, 4, 5, 6, 5, 7, 6, 8, 9, 10, 9, 11, 10, 12, 13,
            14, 13, 15, 14, 16, 17, 18, 17, 19, 18, 20, 21, 22, 21, 23, 22);
    }
}

class Fishtank_Glass extends Shape {
    constructor() {
        super("position", "color");
        // When a set of lines is used in graphics, you should think of the list entries as
        // broken down into pairs; each pair of vertices will be drawn as a line segment.
        // Note: since the outline is rendered with Basic_shader, you need to redefine the position and color of each vertex
        this.arrays.position = Vector3.cast(
            [-22, -10, 1], [-22, 10, 1], // left line
            [22, -10, 1], [22, 10, 1], // right line
            [-22, 10, 1], [22, 10, 1], // top line
            [-22, -10, 1], [22, -10, 1] // bottom line
        );
        this.arrays.color = [ 
            vec4(1,1,1,1), vec4(1,1,1,1), 
            vec4(1,1,1,1), vec4(1,1,1,1), 
            vec4(1,1,1,1), vec4(1,1,1,1), 
            vec4(1,1,1,1), vec4(1,1,1,1)
        ];
        this.indices = false;
    }
}

class Fish extends Shape{
    constructor() {
        super("position", "normal");
        this.arrays.position = Vector3.cast(
            [-4, -1, 1], [-4, 1, 1], [4, -1, 1], [4, 1, 1], // front face
            [-4, -1, -1], [-4, 1, -1], [4, -1, -1], [4, 1, -1], // back face
            [-4, 1, 1], [-4, -1, 1], [-4, 1, -1], [-4, -1, -1], // left face
            [4, 1, 1], [4, -1, 1], [4, 1, -1], [4, -1, -1], // right face
            [-4, 1, 1], [-4, 1, -1], [4, 1, 1], [4, 1, -1], // top face
            [-4, -1, 1], [-4, -1, -1], [4, -1, 1], [4, -1, -1], // bottom face
        )
        this.arrays.normal = Vector3.cast(); // normals???
        this.indices.push(0, 1, 2, 1, 3, 2, 4, 5, 6, 5, 7, 6, 8, 9, 10, 9, 11, 10, 12, 13,
            14, 13, 15, 14, 16, 17, 18, 17, 19, 18, 20, 21, 22, 21, 23, 22);
    } 
}

/////////////////////////////////////////////
///////           SCENE           ///////////
/////////////////////////////////////////////

class Base_Scene extends Scene {
  /**
   *  **Base_scene** is a Scene that can be added to any display canvas.
   *  Setup the shapes, materials, camera, and lighting here.
   */
  constructor() {
      // constructor(): Scenes begin by populating initial values like the Shapes and Materials they'll need.
      super();
      this.hover = this.swarm = false;

      // At the beginning of our program, load one of each of these shape definitions onto the GPU.
      this.shapes = {
          'cube': new Cube(),
          'outline': new Cube_Outline(),
          'triangle_strip': new Cube_Single_Strip(),
          "fishtank_base": new Fishtank_Base(),
          "fishtank_wall": new Fishtank_Wall(),
          "fishtank_glass": new Fishtank_Glass(),
          "fish": new Fish()
      };

      // *** Materials
      this.materials = {
          plastic: new Material(new defs.Phong_Shader(),
              {ambient: .4, diffusivity: .6, color: hex_color("#ffffff")}),
      };
      // The white material and basic shader are used for drawing the outline.
      this.white = new Material(new defs.Basic_Shader());
  }

  display(context, program_state) {
      // display():  Called once per frame of animation. Here, the base class's display only does
      // some initial setup.

      // Setup -- This part sets up the scene's overall camera matrix, projection matrix, and lights:
      if (!context.scratchpad.controls) {
          this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
          // Define the global camera and projection matrices, which are stored in program_state.
          program_state.set_camera(Mat4.translation(0, -14, -55));
      }
      program_state.projection_transform = Mat4.perspective(
          Math.PI / 4, context.width / context.height, 1, 100);

      // *** Lights: *** Values of vector or point lights.
      const light_position = vec4(0, 5, 5, 1);
      program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 1000)];
  }
}

/////////////////////////////////////////////
///////       SCENE OBJECT        ///////////
/////////////////////////////////////////////

export class Final_Project extends Base_Scene {
  /**
   * This Scene object can be added to any display canvas.
   * We isolate that code so it can be experimented with on its own.
   * This gives you a very small code sandbox for editing a simple scene, and for
   * experimenting with matrix transformations.
   */

  make_control_panel() {
      // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
      this.key_triggered_button("Button", ["m"], () => {
        // placeholder button
          window.alert("Button pressed");
      });
  }

  draw_box(context, program_state, model_transform, material) {
      this.shapes.cube.draw(context, program_state, model_transform, material)
  }

  draw_fishtank(context, program_state, model_transform){
    // colors
    const grey = hex_color("#D6D9DA");
    const dark_grey = hex_color("99A0A3")
    
    // draw stone base (bottom)
    this.shapes.fishtank_base.draw(context, program_state, model_transform, this.materials.plastic.override(grey));

    // draw stone walls (left/right)
    let wall_transform = model_transform;
    wall_transform = wall_transform.times(Mat4.translation(-25,12,0));
    this.shapes.fishtank_wall.draw(context, program_state, wall_transform, this.materials.plastic.override(dark_grey));
    wall_transform = wall_transform.times(Mat4.translation(50,0,0));
    this.shapes.fishtank_wall.draw(context, program_state, wall_transform, this.materials.plastic.override(dark_grey));

    // draw glass panels (front/back)
    let glass_transform = model_transform;
    glass_transform = glass_transform.times(Mat4.translation(0,12,9));
    this.shapes.fishtank_glass.draw(context, program_state, glass_transform, this.white, "LINES")
    glass_transform = glass_transform.times(Mat4.translation(0,0,-20));
    this.shapes.fishtank_glass.draw(context, program_state, glass_transform, this.white, "LINES")
  }

  draw_fish(context, program_state, fish_transform){
    // TODO: 
    const orange = hex_color("#F29C50");

    fish_transform = fish_transform.times(Mat4.translation(0,10, 0));
    this.shapes.fish.draw(context, program_state, fish_transform, this.materials.plastic.override(orange));

    // update fish position
    return fish_transform;
  }

  display(context, program_state) {
      super.display(context, program_state);
      const blue = hex_color("#1A9FFA");
      let model_transform = Mat4.identity();
      let fish_transform = Mat4.identity();

      // Draw your entire scene here.  Use this.draw_box( graphics_state, model_transform ) to call your helper.

      //this.draw_box(context, program_state, model_transform, this.materials.plastic.override(blue));

      // call draw_fishtank to place fishtank into the world
      this.draw_fishtank(context, program_state, model_transform);
      
      // call draw_fish to place fish into the world
      fish_transform = this.draw_fish(context, program_state, fish_transform);
  }
}