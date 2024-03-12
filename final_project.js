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
            "fish": new Fish(),
            "fishtank_back_glass": new Fishtank_Back_Glass(),

            // Fish
            "fish1" : new Shape_From_File("assets/Fish1.obj"),

            // Text 
            "text": new Text_Line(5),

            // Background
            "square": new Square(),
        };

        // *** Materials
        this.materials = {
                plastic: new Material(new defs.Phong_Shader(),
                    {ambient: .4, diffusivity: .6, color: hex_color("#ffffff")
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

        // x_dir : RIGHT, LEFT
        // y_dir : UP, DOWN, NONE

        // Fish 1 
        this.fish1 = {
            id: 1,
            coords: [0,4,10],
            x_dir: "RIGHT",
            y_dir: "UP",
            x_speed: 0.2,
            y_speed: 0.1
        }

        // Fish 2
        this.fish2 = {
            id: 2,
            coords: [0,16,8],
            x_dir: "LEFT",
            y_dir: "DOWN",
            x_speed: 0.09,
            y_speed: 0.07
        }

        // Money 
        this.money = 0;
        this.lastUpdateTime = 0;
        this.moneyIncrement = 1;

        // Decorations
        this.decorations = [];
        this.decorationCount = 0;

        
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
      const light_position = vec4(0, 35, 5, 1);
      program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 500)];
  }
}

/////////////////////////////////////////////
///////       SCENE OBJECT        ///////////
/////////////////////////////////////////////

export class Final_Project extends Base_Scene {
    constructor() {
        super();
        // Initialize x and y with initial values
        this.x = 1;
        this.y = 1;

        this.scaling_factor = 1;
        this.movement_reduction = 1;
        this.vertical_reduction = 0;
        
        this.fed_count = 0;
        this.clean = 0;
    }

    make_control_panel() {
        this.control_panel.innerHTML += "Purchase Upgrades<br>";
        this.new_line();

        this.key_triggered_button("Expand Tank", ["g"], () => {
            // When button is pressed, increment x and y by 0.2, with a maximum of 1.8
            this.x = Math.min(this.x + 0.1, 1.8);
            this.y = Math.min(this.y + 0.01, 1.08)

            console.log("Growing by 0.1");
        });
        this.key_triggered_button("Add Decoration", ["j"], () => {
            console.log("Decoration Added");
        });
        this.key_triggered_button("Buy fish", ["h"], () => {
            console.log("new fish added");
        });

        this.new_line();
        this.new_line();
        this.new_line();

        this.control_panel.innerHTML += "Take care of your fish<br>";
        this.new_line();
        this.key_triggered_button("Feed Fish", ["f"], () => {
            if (this.fed_count == 4) {
                console.log("Fish Fully Fed");
            } else {
                this.scaling_factor = Math.min(this.scaling_factor + 0.25, 2)
                this.vertical_reduction = this.vertical_reduction + 0.75;
                this.movement_reduction = this.movement_reduction * 0.75;
                this.fed_count += 1;
                console.log("Fish Fed");
            }
        });
        this.key_triggered_button("Clean Tank", ["c"], () => {
            this.clean += 1;
        });
    }

    draw_fishtank(context, program_state, model_transform){
        // colors
        const grey = hex_color("#D6D9DA");
        const dark_grey = hex_color("99A0A3")
        // fish tank background color 
        const initial_color = hex_color("#6495ED"); // Initial color (blue)
        const final_color = hex_color("#8B4513");   // Final color (brown)


        // Calculate the interpolation factor based on time
        let color_time = Math.max(((program_state.animation_time / 100000) - this.clean) % 1, 0); // Animation time in seconds, mod 1 to keep it in the range [0, 1]


        // Interpolate between initial and final colors
        let interpolated_color = initial_color.mix(final_color, color_time);

        model_transform = model_transform.times(Mat4.scale(this.x, this.y, 1));
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
        // back
        glass_transform = glass_transform.times(Mat4.translation(0,0,-9));
        this.shapes.fishtank_back_glass.draw(context, program_state, glass_transform, this.materials.plastic.override(interpolated_color));

        glass_transform = glass_transform.times(Mat4.scale(1 / this.x, 1 / this.y, 1));
        glass_transform = glass_transform.times(Mat4.translation(0, 5, -19));
        this.shapes.square.draw(context, program_state, glass_transform, this.materials.background);

    }

    detect_collision_horizontal(x_coordinate, horizontal_offset, direction){
        let didCollide = false;
        
        if(direction === "RIGHT"){
            const max_x = 25 * this.x - 6; // Adjusted for fish size and fish tank growth
            const fish_x_position = x_coordinate + horizontal_offset; // Update fish x position with offset

            didCollide = fish_x_position >= max_x;
        }
        if(direction === "LEFT"){
            const min_x = -25 * this.x + 6; // Adjusted for fish size and fish tank growth
            const fish_x_position = x_coordinate + horizontal_offset; // Update fish x position with offset

            didCollide = fish_x_position <= min_x;
        }

        return didCollide;
    }

    detect_collision_vertical(y_coordinate, vertical_offset, direction){
        let didCollide = false;

        if(direction === "UP"){
            const max_y = 21;
            const fish_y_position = y_coordinate + vertical_offset;

            didCollide = fish_y_position >= max_y;
        }
        if(direction === "DOWN"){
            const min_y = 3;
            const fish_y_position = y_coordinate - vertical_offset;

            didCollide = fish_y_position <= min_y;
        }

        return didCollide;
    }

    old_draw_fish(context, program_state, fish_transform, current_time) {
        const orange = hex_color("#FFA500");

        // Calculate fish's vertical movement based on sine wave function
        const vertical_offset = 2 * this.movement_reduction * this.x * Math.sin(2 * Math.PI * 0.5 * current_time / 1000)
         + Math.sin(2 * Math.PI * 0.5 * current_time / 3000) - this.vertical_reduction;

        // Calculate fish's horizontal movement based on cosine wave function
        let horizontal_offset = 2 * this.movement_reduction * this.x * (4 * Math.cos(2 * Math.PI * 0.5 * current_time / 2000) 
         - 3 * Math.cos(3 * Math.PI * 0.5 * current_time / 2000) - 2 * Math.sin(0.5 * Math.PI * 3 * current_time / 1000)) 
         + 3 * Math.sin(2 * Math.PI * 0.5 * current_time / 3000);

        // Check for collisions with walls
        while (this.detect_collision_left(fish_transform, horizontal_offset) || this.detect_collision_right(fish_transform, horizontal_offset)) {
            // Gradually change direction upon collision with the wall
            horizontal_offset += 5 * (current_time / 1000); // Gradually reverse direction
        }
        // Adjust the fish's position based on vertical and horizontal offsets
        fish_transform = fish_transform.times(Mat4.scale(this.scaling_factor, this.scaling_factor, this.scaling_factor));
        fish_transform = fish_transform.times(Mat4.translation(horizontal_offset, 10 + vertical_offset, 0));

        // Draw the fish
        this.shapes.fish1.draw(context, program_state, fish_transform, this.materials.plastic.override(orange));

        // Update fish position
        return fish_transform;
    }

    //.times(Mat4.rotation(Math.PI/2,0,1,0))
    draw_fish(context, program_state, fish_transform, current_time, fish) {
        const orange = hex_color("#FFA500");

        // Calculate horizontal offset
        let x_offset = 0;

        if(fish.x_dir === "RIGHT"){
            if(this.detect_collision_horizontal(fish.coords[0], 0.1, "RIGHT")){
                console.log('hit wall!'); 
                fish.x_dir = "LEFT";
            }
            else{
                x_offset = fish.x_speed;
            }
        }
        if(fish.x_dir === "LEFT"){
            if(this.detect_collision_horizontal(fish.coords[0], 0.1, "LEFT")){
                console.log('hit wall!'); 
                fish.x_dir = "RIGHT";
            }
            else{
                x_offset = -fish.x_speed;
            }
        }

        // Calculate vertical offset
        let y_offset = 0;

        if(fish.y_dir === "UP"){
            if(this.detect_collision_vertical(fish.coords[1], 0.1, "UP")){
                console.log('hit ceiling!');
                fish.y_dir = "DOWN";
            }
            else{
                y_offset = fish.y_speed;
            }
        }
        if(fish.y_dir === "DOWN"){
            if(this.detect_collision_vertical(fish.coords[1], 0.1, "DOWN")){
                console.log('hit ceiling!');
                fish.y_dir = "UP";
            }
            else{
                y_offset = -fish.y_speed;
            }
        }


        // Update fish coordinates
        fish.coords[0] += x_offset;
        fish.coords[1] += y_offset;


        // Calculate fish transformation matrix
        let facing_dir = fish.x_dir === "RIGHT" ? Math.PI/2 : -Math.PI/2; // direction fish is facing

        fish_transform = fish_transform.times(Mat4.translation(fish.coords[0],fish.coords[1],fish.coords[2]))
                                       .times(Mat4.scale(this.scaling_factor, this.scaling_factor, this.scaling_factor))
                                       .times(Mat4.rotation(facing_dir,0,1,0));


        // Draw the fish
        this.shapes.fish1.draw(context, program_state, fish_transform, this.materials.plastic.override(orange));
    }

    // no longer needed
    // 
    // // Change fish directions
    // change_fish_dir_horizontal(fish_number, new_dir){
    //     if(fish_number === 1){
    //         this.fish1.x_dir = new_dir;
    //     }
    // }

    // change_fish_dir_vertical(fish_number, new_dir){
    //     if(fish_number === 1){
    //         this.fish1.y_dir = new_dir;
    //     }
    // }

    // // Change fish coordinates
    // change_fish_x(fish_number, x_offset){
    //     if(fish_number === 1){
    //         this.fish1.coords[0] += x_offset;
    //     }
    // }

    // change_fish_y(fish_number, y_offset){
    //     if(fish_number === 1){
    //         this.fish1.coords[1] += y_offset;
    //     }
    // }

    draw_money(context, program_state, model_transform, t){
        const elapsedTime = t - this.lastUpdateTime;

        if(elapsedTime >= 1){
            this.money += this.moneyIncrement;
            this.lastUpdateTime = t;
        }

        let money_text = this.money < 1000 ? `$${this.money}` : `$${Math.floor(this.money/1000)}.${Math.floor((this.money%1000)/100)}k`
        
        this.shapes.text.set_string(money_text.toString(), context.context);
        this.shapes.text.draw(context, program_state, model_transform, this.materials.text_image);
    }

    display(context, program_state) {
        super.display(context, program_state);
        const orange = hex_color("#FFA500");

        // Transformation Matrices
        let model_transform = Mat4.identity();
        let fish_transform = Mat4.identity();
        let fish2_transform = Mat4.identity();
        let money_transform = Mat4.identity().times(Mat4.translation(32,33,0));

        // Time
        const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;

        // Call draw_fishtank to place fishtank into the world
        this.draw_fishtank(context, program_state, model_transform);
        
        // Call draw_fish to place fish into the world and pass the current time
        this.draw_fish(context, program_state, fish_transform, t, this.fish1);
        this.draw_fish(context, program_state, fish_transform, t, this.fish2);

        // Calculate Money 
        this.draw_money(context, program_state, money_transform, t);

        //fish_transform = fish_transform.times(Mat4.translation(0,10,10)).times(Mat4.rotation(-Math.PI/2,0,1,0));

    }
}