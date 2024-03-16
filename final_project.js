import { defs, tiny } from './examples/common.js';
import { Text_Line } from './examples/text-demo.js';
import { Shape_From_File } from './examples/obj-file-demo.js';


const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene, Texture,
} = tiny;

const {Textured_Phong} = defs


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

class Fishtank_Back_Glass extends Shape {
    constructor() {
        super("position", "normal");

        // Define the vertices of the back wall
        this.arrays.position = Vector3.cast(
            [-22, -10, -10], [-22, 10, -10], // bottom left
            [22, -10, -10], [22, 10, -10]   // bottom right
        );

        // The normal of the back wall will be facing away from the viewer
        // You can manually specify the normal as (0, 0, 1) for all vertices
        // or use automatic normal calculation if your shader supports it
        this.arrays.normal = Vector3.cast(
            [0, 0, 1], [0, 0, 1],
            [0, 0, 1], [0, 0, 1]
        );

        // Indicate that the shape is composed of triangles
        this.indices = [0, 1, 2, 1, 3, 2];
    }
}

class Square extends Shape {
    constructor() {
        super("position", "normal");

        // Define the vertices of the square
        this.arrays.position = Vector3.cast(
            [-75, -75, -22], [-75, 75, -22], // bottom left
            [75, -75, -22], [75, 75, -22]    // bottom right
        );

        this.arrays.texture_coord = Vector.cast(
            [0, 0], [0, 1], // bottom left
            [1, 0], [1, 1]  // bottom right
        );

        // The normal of the square will be facing away from the viewer
        // You can manually specify the normal as (0, 0, 1) for all vertices
        // or use automatic normal calculation if your shader supports it
        this.arrays.normal = Vector3.cast(
            [0, 0, 1], [0, 0, 1],
            [0, 0, 1], [0, 0, 1]
        );

        // Indicate that the shape is composed of triangles
        this.indices = [0, 1, 2, 1, 3, 2];
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
            "fish": new Fish(), // simple rectangle
            "fishtank_back_glass": new Fishtank_Back_Glass(),

            // Fish
            "fish1" : new Shape_From_File("assets/salmon.obj"),
            "fish2" : new Shape_From_File("assets/clownfish.obj"),

            // Text 
            "text": new Text_Line(25),

            // Background
            "square": new Square(),

            // Decorations
            "grass1" : new Shape_From_File("assets/Grass1.obj"),
            "grass2" : new Shape_From_File("assets/Grass2.obj"),
            "flower" : new Shape_From_File("assets/Flowers_1.obj"),
            "rock" : new Shape_From_File("assets/Rock1.obj"),
            "coral1": new Shape_From_File("assets/Willow_Dead_1.obj"),
            "coral2": new Shape_From_File("assets/Willow_Dead_2.obj"),
            "kelp" : new Shape_From_File("assets/Corn_4.obj"),

        };


        // *** Materials
        this.materials = {
                plastic: new Material(new defs.Phong_Shader(),
                    {ambient: .6, diffusivity: .6, color: hex_color("#ffffff")
                }),
                text_image: new Material(new Textured_Phong(1), {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/text.png")
                }),
                background: new Material(new Textured_Phong(), {
                    color: hex_color("#000000"),
                    ambient: 1, 
                    texture: new Texture("assets/background.jpg"),
                }),
                wall: new Material(new Textured_Phong(), {
                    color: hex_color("#000000"),
                    ambient: 1, 
                    texture: new Texture("assets/texture.jpg"),
                }),
        };
        // The white material and basic shader are used for drawing the outline.
        this.white = new Material(new defs.Basic_Shader());

        
        // Fish 
        this.fishCount = 1;
        this.fishArray = [
            {// Fish 1
                id: 1,
                coords: [0,4,10],
                x_dir: "RIGHT", // x_dir : RIGHT, LEFT, NONE
                y_dir: "UP", // y_dir : UP, DOWN, NONE
                x_speed: 0.05,
                y_speed: 0.04,
                type: 1,
                last_update_time: 0,
                floated: false,
                colour: "#FFA500"
            },
            {// Fish 2
                id: 2,
                coords: [-15,16,8],
                x_dir: "RIGHT",
                y_dir: "DOWN",
                x_speed: 0.09,
                y_speed: 0.07,
                type: 1,
                last_update_time: 0,
                floated: false,
                colour: "#00ffb5"
            },
            { // Fish 3
                id: 3,
                coords: [5,10,6],
                x_dir: "LEFT",
                y_dir: "NONE",
                x_speed: 0.05,
                y_speed: 0.05,
                type: 2,
                last_update_time: 0,
                floated: false,
                colour: "#FAA0A0"
            },
            { // Fish 4
                id: 4,
                coords: [-3,19,4],
                x_dir: "RIGHT",
                y_dir: "DOWN",
                x_speed: 0.1,
                y_speed: 0.09,
                type: 2,
                last_update_time: 0,
                floated: false,
                colour: "#FDDA0D"
            },
            { // Fish 5
                id: 5,
                coords: [17,5,2],
                x_dir: "LEFT",
                y_dir: "DOWN",
                x_speed: 0.06,
                y_speed: 0.04,
                type: 1,
                last_update_time: 0,
                floated: false,
                colour: "#E0B0FF"
            },
            { // Fish 6
                id: 6,
                coords: [15,12,0],
                x_dir: "RIGHT",
                y_dir: "NONE",
                x_speed: 0.06,
                y_speed: 0.05,
                type: 1,
                last_update_time: 0,
                floated: false,
                colour: "#FA5F55"
            },
            { // Fish 7
                id: 7,
                coords: [-9,16,-2],
                x_dir: "RIGHT",
                y_dir: "DOWN",
                x_speed: 0.07,
                y_speed: 0.05,
                type: 2,
                last_update_time: 0,
                floated: false,
                colour: "#FDDA0D"
            },
            { // Fish 8
                id: 8,
                coords: [18,6,-4],
                x_dir: "LEFT",
                y_dir: "UP",
                x_speed: 0.07,
                y_speed: 0.05,
                type: 2,
                last_update_time: 0,
                floated: false,
                colour: "#E0B0FF"
            },
            { // Fish 9
                id: 9,
                coords: [2,16,-6],
                x_dir: "LEFT",
                y_dir: "NONE",
                x_speed: 0.09,
                y_speed: 0.07,
                type: 1,
                last_update_time: 0,
                floated: false,
                colour: "#FFA500"
            },
            { // Fish 10
                id: 10,
                coords: [-14,5,-8],
                x_dir: "RIGHT",
                y_dir: "UP",
                x_speed: 0.09,
                y_speed: 0.08,
                type: 2,
                last_update_time: 0,
                floated: false,
                colour: "#4CBB17"
            }
        ];
        this.maxFishCount = this.fishArray.length;
        this.lastFishUpdateTime = 0;
        this.killFish = false;
        this.numFishDead = 0;
        this.fishOgCoordinates = [[0,4,10],[-15,16,8],[5,10,6],[-3,19,4],[17,5,2],[15,12,0],[-9,16,-2],[18,6,-4],[2,16,-6],[-14,5,-8]];


        // Money 
        this.money = 0;
        this.lastMoneyUpdateTime = 0;
        this.moneyIncrement = 1;

        // Decorations
        this.decorationCount = 0;
        this.maxDecorationCount = 5;

        // Music 
        this.background_music = new Audio("assets/aquarium-fish-132518.mp3");
        
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
      const light_position = vec4(0, 30, 5, 1);
      program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 500)];

      // Music 
      this.background_music.play();
  }
}

/////////////////////////////////////////////
///////       SCENE OBJECT        ///////////
/////////////////////////////////////////////

export class Final_Project extends Base_Scene {
    constructor() {
        super();

        // Controls tank dimensions
        this.tank_x_scale = 1;
        this.tank_y_scale = 1;

        // Tank edge coordinates
        this.tank_right_x = 19;
        this.tank_left_x = -19;

        // Collision detection boundary 
        this.x_boundary = 6;
        this.y_boundary = 0;

        this.fish_scaling_factor = 1;
        
        this.fed_count = 0;
        this.clean = 0;

        this.display_text = "";
    }

    make_control_panel() {
        

        this.control_panel.innerHTML += "Purchase Upgrades<br>";
        this.new_line();

        this.key_triggered_button("Expand Tank - $25", ["g"], () => {
            this.expand_tank();

        });
        this.key_triggered_button("Add Decoration - $5", ["j"], () => {
            this.add_decoration();
        });
        this.key_triggered_button("Buy fish - $10", ["h"], () => {
            this.buy_fish();
        });

        this.new_line();
        this.new_line();
        this.new_line();

        this.control_panel.innerHTML += "Take care of your fish<br>";
        this.new_line();
        this.key_triggered_button("Feed Fish - $2", ["e"], () => {
            if(this.fishCount > 0 ){
                if (this.fed_count == 4) {
                    this.display_text = "Fish too fat! Go diet";
                } else {
                    this.display_text = "Fish Fed";
                    this.fish_scaling_factor = Math.min(this.fish_scaling_factor + 0.25, 2)
                    this.fed_count += 1;
                    this.money -= 2;
                    this.x_boundary += 1;
                    this.y_boundary += .5;
                }
            }
            else{
                this.display_text = "No fish to feed";
            }
        });
        this.key_triggered_button("Clean Tank - $5", ["c"], () => {
            this.display_text = "Tank Cleaned";
            this.clean += 1;
            this.money -= 5;
        });

        this.new_line();
        this.new_line();
        this.new_line();

        this.control_panel.innerHTML += "For demo purposes<br>";
        this.key_triggered_button("kill fish", ["l"], () => {
            this.killFish = true;
        });
        this.key_triggered_button("add money", ["p"], () => {
            this.money = 1000;
        });
        // TODO: add color_time fast forwarder
        // this.key_triggered_button("make tank dirty", ["i"], () => {
        //     this.color_time = 0.68;
        // });
    }

    ////////////// FISH TANK ////////////////

    draw_fishtank(context, program_state, model_transform, t){
        // colors
        const light_yellow = hex_color("#f6d7b0");
        const blue = hex_color("#6495ED")
        // fish tank background color 
        const initial_color = hex_color("#6495ED"); // Initial color (blue)
        const final_color = hex_color("#8B4513");   // Final color (brown)


        // Calculate the interpolation factor based on time
        let color_time = Math.max(((program_state.animation_time / 100000) - this.clean) % 1, 0); // Animation time in seconds, mod 1 to keep it in the range [0, 1]

        // Kill fish if tank is dirty for too long
        if(color_time >= 0.6){
            this.display_text = "Clean your tank now!";
        }
        if(color_time >= 0.65){
            this.display_text = "I warned you...";
        }
        if(color_time >= 0.7){
            this.display_text = "";
            this.killFish = true;
        }


        // Interpolate between initial and final colors
        let interpolated_color = initial_color.mix(final_color, color_time);

        model_transform = model_transform.times(Mat4.scale(this.tank_x_scale, this.tank_y_scale, 1));
        // draw stone base (bottom)
        this.shapes.fishtank_base.draw(context, program_state, model_transform, this.materials.plastic.override(light_yellow));

        // draw top cover 
        let top_transform = model_transform.times(Mat4.translation(0,23,0))
                                           .times(Mat4.scale(1, .5, 1));
        this.shapes.fishtank_base.draw(context, program_state, top_transform, this.materials.plastic.override(interpolated_color));


        // draw stone walls (left/right)
        let wall_transform = model_transform;
        wall_transform = wall_transform.times(Mat4.translation(-25,12,0));
        this.shapes.fishtank_wall.draw(context, program_state, wall_transform, this.materials.plastic.override(interpolated_color));
        wall_transform = wall_transform.times(Mat4.translation(50,0,0));
        this.shapes.fishtank_wall.draw(context, program_state, wall_transform, this.materials.plastic.override(interpolated_color));

        // draw glass panels (front/back)
        let glass_transform = model_transform;
        glass_transform = glass_transform.times(Mat4.translation(0,12,9));
        this.shapes.fishtank_glass.draw(context, program_state, glass_transform, this.white, "LINES")
        // back
        glass_transform = glass_transform.times(Mat4.translation(0,0,-9));
        this.shapes.fishtank_back_glass.draw(context, program_state, glass_transform, this.materials.plastic.override(interpolated_color));

        glass_transform = glass_transform.times(Mat4.scale(1 / this.tank_x_scale, 1 / this.tank_y_scale, 1));
        glass_transform = glass_transform.times(Mat4.translation(0, 5, -19));
        this.shapes.square.draw(context, program_state, glass_transform, this.materials.background);

    }


    ////////////// COLLISION DETECTION ////////////////

    detect_collision_horizontal(x_coordinate, horizontal_offset, direction){
        let didCollide = false;
        
        if(direction === "RIGHT"){
            const max_x = 25 * this.tank_x_scale - this.x_boundary; // Adjusted for fish size and fish tank growth
            const fish_x_position = x_coordinate + horizontal_offset; // Update fish x position with offset

            didCollide = fish_x_position >= max_x;
        }
        if(direction === "LEFT"){
            const min_x = -25 * this.tank_x_scale + this.x_boundary; // Adjusted for fish size and fish tank growth
            const fish_x_position = x_coordinate + horizontal_offset; // Update fish x position with offset

            didCollide = fish_x_position <= min_x;
        }

        return didCollide;
    }

    detect_collision_vertical(y_coordinate, vertical_offset, direction){
        let didCollide = false;

        if(direction === "UP"){
            const max_y = 21;
            const fish_y_position = y_coordinate + vertical_offset + this.y_boundary;

            didCollide = fish_y_position >= max_y;
        }
        if(direction === "DOWN"){
            const min_y = 3;
            const fish_y_position = y_coordinate - vertical_offset - this.y_boundary;

            didCollide = fish_y_position <= min_y;
        }

        return didCollide;
    }


    ////////////// FISH  ////////////////

    draw_fish(context, program_state, fish_transform, t, fish) {
        const fishColour = hex_color(fish.colour);

        // randomly change fish direction every 2 seconds
        const elapsedTime = t - fish.last_update_time;
        if(elapsedTime >= 2){
            this.randomly_change_fish_dir(fish);
            fish.last_update_time = t;
        }

        // Calculate horizontal offset
        let x_offset = 0;

        if(fish.x_dir === "RIGHT"){
            if(this.detect_collision_horizontal(fish.coords[0], fish.x_speed, "RIGHT")){
                fish.x_dir = "LEFT";
            }
            else{
                x_offset = fish.x_speed;
            }
        }
        if(fish.x_dir === "LEFT"){
            if(this.detect_collision_horizontal(fish.coords[0], fish.x_speed, "LEFT")){
                fish.x_dir = "RIGHT";
            }
            else{
                x_offset = -fish.x_speed;
            }
        }
        if(fish.x_dir === "NONE"){
            x_offset = 0;
        }

        // Calculate vertical offset
        let y_offset = 0;

        if(fish.y_dir === "UP"){
            if(this.detect_collision_vertical(fish.coords[1], fish.y_speed, "UP")){
                fish.y_dir = "DOWN";
            }
            else{
                y_offset = fish.y_speed;
            }
        }
        if(fish.y_dir === "DOWN"){
            if(this.detect_collision_vertical(fish.coords[1], fish.y_speed, "DOWN")){
                fish.y_dir = "UP";
            }
            else{
                y_offset = -fish.y_speed;
            }
        }
        if(fish.y_dir === "NONE"){
            y_offset = 0;
        }


        // Update fish coordinates
        fish.coords[0] += x_offset;
        fish.coords[1] += y_offset;


        // Calculate fish transformation matrix
        let facing_dir = fish.x_dir === "RIGHT" ? Math.PI/2 : -Math.PI/2; // direction fish is facing

        fish_transform = fish_transform.times(Mat4.translation(fish.coords[0],fish.coords[1],fish.coords[2]))
                                       .times(Mat4.scale(this.fish_scaling_factor, this.fish_scaling_factor, this.fish_scaling_factor))
                                       .times(Mat4.rotation(facing_dir,0,1,0));


        // Draw the fish
        // call either draw_fish_1() or draw_fish_2()
        if(fish.type === 1){
            this.draw_fish_type_1(context, program_state, fish_transform, this.materials.plastic.override(fishColour));
        }
        else{
            this.draw_fish_type_2(context, program_state, fish_transform, this.materials.plastic.override(fishColour));
        }
    }

    // Draws fish type 1
    draw_fish_type_1(context, program_state, fish_transform, materials){
        this.shapes.fish1.draw(context, program_state, fish_transform, materials);
    }

    // Draws fish type 2
    draw_fish_type_2(context, program_state, fish_transform, materials){
        this.shapes.fish2.draw(context, program_state, fish_transform, materials);
    }

    randomly_change_fish_dir(fishObj){
        // 1/50 chance that fish will randomly pause 
        let rand_pause = Math.floor(Math.random() * 50) + 1;
        if(rand_pause === 1){
            fishObj.x_dir = "NONE";
            fishObj.y_dir = "NONE";
        }
        else{
            // Randomly change horizontal direction
            let rand_x = Math.floor(Math.random() * 2) + 1;
            if(rand_x === 1){
                fishObj.x_dir = "LEFT";
            }
            else{
                fishObj.x_dir = "RIGHT";
            }

            // Randomly change vertical direction
            let rand_y = Math.floor(Math.random() * 3);
            if(rand_y === 0){
                fishObj.y_dir = "NONE";
            }
            else if (rand_y === 1){
                fishObj.y_dir = "UP";
            }
            else{
                fishObj.y_dir = "DOWN";
            }
        }
    }

    kill_fish(context, program_state, fish_transform, t, fish){
        const fishColour = hex_color(fish.colour);


        let y_offset = 0;

        // check if fish have floated to the top
        if(this.detect_collision_vertical(fish.coords[1], 0.1, "UP")){       
            fish.floated = true;       
        }
        else{
            y_offset = 0.1
        }

        fish.coords[1] += y_offset;

        // make fish flip on its side 
        let facing_dir = fish.x_dir === "RIGHT" ? Math.PI/2 : -Math.PI/2; // direction fish is facing
        let flip_angle = Math.PI/2;

        fish_transform = fish_transform.times(Mat4.translation(fish.coords[0],fish.coords[1],fish.coords[2]))
                                       .times(Mat4.scale(this.fish_scaling_factor, this.fish_scaling_factor, this.fish_scaling_factor))
                                       .times(Mat4.rotation(facing_dir, 0, 1, 0))
                                       .times(Mat4.rotation(flip_angle, 0, 0, 1));

        
        // Draw the fish
        // call either draw_fish_1() or draw_fish_2()
        if(fish.floated){
            // do not draw fish
        }
        else{
            if(fish.type === 1){
                this.draw_fish_type_1(context, program_state, fish_transform, this.materials.plastic.override(fishColour));
            }
            else{
                this.draw_fish_type_2(context, program_state, fish_transform, this.materials.plastic.override(fishColour));
            }
        } 
    }

    
    ////////////// DECORATIONS ////////////////

    draw_decoration(context, program_state, model_transform, t){
        if(this.decorationCount >= 1){
            this.draw_grass(context, program_state, model_transform, t);
        }
        if(this.decorationCount >= 2){
            this.draw_coral(context, program_state, model_transform, t);
        }
        if(this.decorationCount >= 3){
            this.draw_flowers(context, program_state, model_transform, t)
        }
        if(this.decorationCount >= 4){
            this.draw_rock(context, program_state, model_transform);
        }
        if(this.decorationCount >= 5){
            this.draw_kelp(context, program_state, model_transform, t);
        }
    }

    draw_grass(context, program_state, model_transform, t){
        const green = hex_color("#00FF00");
        const maxAngle = .05*Math.PI;

        let angle = (maxAngle / 2) * Math.sin((2 * Math.PI / 3) * t);

        for(let i = this.tank_right_x; i !== this.tank_left_x - 1; i--){
            if(i%4 === 0){
                let temp = model_transform.times(Mat4.translation(i,0,-6))
                                          .times(Mat4.rotation(angle, 0, 0, 1))
                                          .times(Mat4.scale(1,1.5,1));
                this.shapes.grass1.draw(context, program_state, temp, this.materials.plastic.override(green));
            }
            else{
                let temp = model_transform.times(Mat4.translation(i,0,-4))
                                          .times(Mat4.rotation(angle, 0, 0, 1));
                this.shapes.grass2.draw(context, program_state, temp, this.materials.plastic.override(green));
            }
        }
        for(let i = this.tank_right_x; i !== this.tank_left_x - 1; i--){
            if(i%2 === 0){
                let temp = model_transform.times(Mat4.translation(i,0,4))
                                          .times(Mat4.rotation(angle, 0, 0, 1));
                this.shapes.grass1.draw(context, program_state, temp, this.materials.plastic.override(green));
            }
            else{
                let temp = model_transform.times(Mat4.translation(i,0,0))
                                          .times(Mat4.rotation(-angle, 0, 0, 1));
                this.shapes.grass2.draw(context, program_state, temp, this.materials.plastic.override(green));
            }
        }
        for(let i = this.tank_right_x; i !== this.tank_left_x - 1; i--){
            if(i%3 === 0){
                let temp = model_transform.times(Mat4.translation(i,0,7))
                                          .times(Mat4.rotation(angle, 0, 0, 1))
                                          .times(Mat4.scale(1,0.5,1));
                this.shapes.grass2.draw(context, program_state, temp, this.materials.plastic.override(green));
            }
            else{
                let temp = model_transform.times(Mat4.translation(i,0,8))
                                          .times(Mat4.rotation(-angle, 0, 0, 1))
                                          .times(Mat4.scale(1,0.5,1));
                this.shapes.grass2.draw(context, program_state, temp, this.materials.plastic.override(green));
            }
        }
        for(let i = this.tank_right_x; i !== this.tank_left_x - 1; i--){
            if(i%2 === 0){
                let temp = model_transform.times(Mat4.translation(i,0,12))
                                          .times(Mat4.rotation(angle, 0, 0, 1));
                this.shapes.grass2.draw(context, program_state, temp, this.materials.plastic.override(green));
            }
            else{
                let temp = model_transform.times(Mat4.translation(i,0,10))
                                          .times(Mat4.rotation(-angle, 0, 0, 1));
                this.shapes.grass2.draw(context, program_state, temp, this.materials.plastic.override(green));
            }
        }

    }

    draw_coral(context, program_state, model_transform, t){
        const red = hex_color("#c44025");
        const pink = hex_color("#FFC0CB");

        const maxAngle = .02*Math.PI;
        let angle = (maxAngle / 2) * Math.sin((2 * Math.PI / 3) * t);

        let temp1 = model_transform.times(Mat4.translation(this.tank_left_x,3,-3))
                                   .times(Mat4.rotation(angle, 0, 0, 1))
                                   .times(Mat4.scale(4,4,4));
        this.shapes.coral1.draw(context, program_state, temp1, this.materials.plastic.override(red));

        let temp2 = model_transform.times(Mat4.translation(this.tank_left_x + 5,3,-5))
                                   .times(Mat4.rotation(-angle, 0, 0, 1))
                                   .times(Mat4.scale(4,3,4));
        this.shapes.coral1.draw(context, program_state, temp2, this.materials.plastic.override(red));


        let temp3 = model_transform.times(Mat4.translation(this.tank_left_x + 10,1,1))
                                   .times(Mat4.rotation(-angle, 0, 0, 1))
                                   .times(Mat4.scale(3,3,3));
        this.shapes.coral2.draw(context, program_state, temp3, this.materials.plastic.override(pink));
    }

    draw_flowers(context, program_state, model_transform, t){
        const purple = hex_color("#d5aff0");

        const maxAngle = .02*Math.PI;
        let angle = (maxAngle / 2) * Math.sin((2 * Math.PI / 3) * t);

        let temp1 = model_transform.times(Mat4.translation(0,2,6))
                                         .times(Mat4.rotation(angle, 0, 0, 1))
                                         .times(Mat4.scale(1.5,2,1));
        this.shapes.flower.draw(context, program_state, temp1, this.materials.plastic.override(purple));

        let temp2 = model_transform.times(Mat4.translation(14,1.5,10))
                                   .times(Mat4.rotation(angle, 0, 0, 1))
                                   .times(Mat4.scale(1.5,1.5,1));
        this.shapes.flower.draw(context, program_state, temp2, this.materials.plastic.override(purple));

        let temp3 = model_transform.times(Mat4.translation(-14,1,10))
                                   .times(Mat4.rotation(angle, 0, 0, 1))
                                   .times(Mat4.scale(1.5,1.5,1));
        this.shapes.flower.draw(context, program_state, temp3, this.materials.plastic.override(purple));

        let temp4 = model_transform.times(Mat4.translation(10,2,0))
                                   .times(Mat4.rotation(angle, 0, 0, 1))
                                   .times(Mat4.scale(1.5,2,1));
        this.shapes.flower.draw(context, program_state, temp4, this.materials.plastic.override(purple));

    }

    draw_rock(context, program_state, model_transform){
        const brown = hex_color("#ab825e");

        let temp = model_transform.times(Mat4.translation(this.tank_right_x - 2,0,-10))
                                  .times(Mat4.scale(8,7,4));

        this.shapes.rock.draw(context, program_state, temp, this.materials.plastic.override(brown));
    }

    draw_kelp(context, program_state, model_transform, t){
        const dark_green = hex_color("#1a7523");

        const maxAngle = .02*Math.PI;
        let angle = (maxAngle / 2) * Math.sin((2 * Math.PI / 3) * t);

        let temp1 = model_transform.times(Mat4.translation(10,6,-7))
                                   .times(Mat4.rotation(angle, 0, 0, 1))
                                   .times(Mat4.scale(4,3,3));
        this.shapes.kelp.draw(context, program_state, temp1, this.materials.plastic.override(dark_green));

        let temp2 = model_transform.times(Mat4.translation(-17,6,-9))
                                   .times(Mat4.rotation(angle, 0, 0, 1))
                                   .times(Mat4.scale(4,4,3));
        this.shapes.kelp.draw(context, program_state, temp2, this.materials.plastic.override(dark_green));

        let temp3 = model_transform.times(Mat4.translation(18,3,-5))
                                   .times(Mat4.rotation(-angle, 0, 0, 1))
                                   .times(Mat4.scale(3,2,2));
        this.shapes.kelp.draw(context, program_state, temp3, this.materials.plastic.override(dark_green));
    }


    ////////////// MONEY + UPGRADES ////////////////

    draw_money(context, program_state, model_transform, t){
        const elapsedTime = t - this.lastMoneyUpdateTime;

        if(elapsedTime >= 1){
            this.money += this.moneyIncrement;
            this.lastMoneyUpdateTime = t;
        }

        let money_text = this.money < 1000 ? `$${this.money}` : `$${Math.floor(this.money/1000)}.${Math.floor((this.money%1000)/100)}k`
        
        this.shapes.text.set_string(money_text.toString(), context.context);
        this.shapes.text.draw(context, program_state, model_transform, this.materials.text_image);
    }

    expand_tank(){
        // Check if the user has enough money
        if(this.money >= 25){
            // Check if tank dimension max has been reached
            if(this.tank_x_scale > 1.3){
                this.display_text = "Tank Fully Upgraded";
            }
            else{
                this.display_text = "Upgraded Tank Size!";
                this.money -= 25;
                this.tank_x_scale += 0.1
                this.tank_right_x += 2;
                this.tank_left_x -= 2;
            }
        }
        else{
            this.display_text = "You're broke! Get job!";
        }
    }

    buy_fish(){
        // Check if the user has enough money
        if(this.money >= 10){
            // Check if fish maximum has been reached
            if(this.fishCount === this.maxFishCount){
                this.display_text = "Too Many Fish!";
            }
            else{
                this.display_text = "Bought a Fish"
                this.money -= 10;
                this.fishCount++;
            }
        }
        else{
            this.display_text = "You're broke! Get job!";
        }
    }

    add_decoration(){
        // Check if the user has enough money
        if(this.money >= 5){
            // Check if decoration maximum has been reached
            if(this.decorationCount === this.maxDecorationCount){
                this.display_text = "All Decorations Added";
            }
            else{
                this.display_text = "New Decoration Added!";
                this.money -= 5;
                this.decorationCount++;
            }
        }
        else{
            this.display_text = "You're broke! Get job!";
        }
    }

    
    ////////////// ON SCREEN TEXT ////////////////

    draw_displaytext(context, program_state, model_transform, t){
        this.shapes.text.set_string(this.display_text, context.context);
        this.shapes.text.draw(context, program_state, model_transform, this.materials.text_image);
    }


    ////////////// DISPLAY ////////////////

    display(context, program_state) {
        super.display(context, program_state);
        const orange = hex_color("#FFA500");
        const green = hex_color("#00FF00");
        const pink = hex_color("#FFC0CB");

        // Transformation Matrices
        let fishtank_transform = Mat4.identity();
        let fish_transform = Mat4.identity();
        let money_transform = Mat4.identity().times(Mat4.translation(32,33,0));
        let decoration_transform = Mat4.identity().times(Mat4.translation(0,4,0));
        let display_text_transform = Mat4.identity().times(Mat4.translation(8,30,0));

        // Time
        const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;

        // Call draw_fishtank to place fishtank into the world
        this.draw_fishtank(context, program_state, fishtank_transform, t);
        
        // Call draw_fish() to place fish into the world
        for(let i = 0; i < this.fishCount; i++){
            if(this.killFish){
                this.display_text = "Your fish all died :(";
                this.kill_fish(context, program_state, fish_transform, t, this.fishArray[i]);
            }
            else{
                this.draw_fish(context, program_state, fish_transform, t, this.fishArray[i]);
            }
        }

        //Reset fish if they all died
        if(this.killFish){
            // Check if all fish have floated to the top
            let deadFishCount = 0;
            for(let i = 0; i < this.fishCount; i++){
                if(this.fishArray[i].floated){
                    deadFishCount++;
                    this.fishArray[i].floated = false;
                }
            }

            // Once all fish have despawned
            if(deadFishCount === this.fishCount){
                this.killFish = false;
                this.fishCount = 0;

                // Reset fish coordinates
                for(let i = 0; i < this.maxFishCount; i++){
                    this.fishArray[i].coords = this.fishOgCoordinates[i].slice();
                }

                // Reset fish size
                this.fed_count = 0;
                this.fish_scaling_factor = 1;
                this.x_boundary = 6;
                this.y_boundary = 0;
            }
        }


        // Call draw_decoration() to place decorations into the world 
        this.draw_decoration(context, program_state, decoration_transform, t);

        // Calculate Money 
        this.draw_money(context, program_state, money_transform, t);

        // display text 
        this.draw_displaytext(context, program_state, display_text_transform, t);
    }
}