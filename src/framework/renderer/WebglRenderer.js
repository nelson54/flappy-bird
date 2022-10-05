module.exports = class WebglRenderer {
    constructor(game, width, height) {
        this.game = game;

        this.width = width;
        this.height = height;

        let canvas = this.canvas = document.createElement('canvas');

        canvas.width = width;
        canvas.height = height;

        canvas.style.margin = 0;
        canvas.style.padding = 0;

        document.body.appendChild(canvas);

        this.context = canvas.getContext("webgl");

        const shaderSet = [
            {
              type: this.context.VERTEX_SHADER,
              id: "vertex-shader"
            },
            {
              type: this.context.FRAGMENT_SHADER,
              id: "fragment-shader"
            }
          ];
        
          shaderProgram = this.buildShaderProgram(shaderSet);

        this.context.viewport(0, 0, canvas.width, canvas.height);
        this.context.clearColor(0.8, 0.9, 1.0, 1.0);
        this.context.clear(this.context.COLOR_BUFFER_BIT);

        // Defaults to identity matrix
        this.debug = false;
        this.transformMatrix = [1, 0, 0, 1, 0, 0];

        let aspectRatio = width/height;
        this.currentRotation = [0, 1];
        this.currentScale = [1.0, aspectRatio];

        let vertexArray = new Float32Array([
            -0.5, 0.5, 0.5, 0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5, -0.5, -0.5, -0.5
        ]);

        let vertexBuffer = context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, vertexBuffer);
        this.context.bufferData(this.context.ARRAY_BUFFER, vertexArray, this.context.STATIC_DRAW);
    }

    buildShaderProgram(shaderInfo) {
        const program = this.context.createProgram();
      
        shaderInfo.forEach((desc) => {
          const shader = this.compileShader(desc.id, desc.type);
      
          if (shader) {
            this.context.attachShader(program, shader);
          }
        });
      
        this.context.linkProgram(program)
      
        if (!this.context.getProgramParameter(program, this.context.LINK_STATUS)) {
          console.log("Error linking shader program:");
          console.log(this.context.getProgramInfoLog(program));
        }
      
        return program;
    }

    compileShader(id, type) {
        const code = document.getElementById(id).firstChild.nodeValue;
        const shader = this.context.createShader(type);
      
        this.context.shaderSource(shader, code);
        this.context.compileShader(shader);
      
        if (!this.context.getShaderParameter(shader, this.context.COMPILE_STATUS)) {
          console.log(`Error compiling ${type === this.context.VERTEX_SHADER ? "vertex" : "fragment"} shader:`);
          console.log(gl.getShaderInfoLog(shader));
        }
        return shader;
    }

    clear() {
        let vertexArray = new Float32Array([
            -0.5, 0.5, 0.5, 0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5, -0.5, -0.5, -0.5
        ]);

        let vertexBuffer = context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, vertexBuffer);
        this.context.bufferData(this.context.ARRAY_BUFFER, vertexArray, this.context.STATIC_DRAW);
    }

    drawScene() {

        this.clear();

        for(let i in this.game.sprites) {
            let sprite = this.game.sprites[i];

            this.draw(sprite);
            this.context.restore();
        }
        if(this.debug) {

             this.drawCollisionBoxes();

            for(let i in this.game.sprites) {
                this.debugSprite(this.game.sprites[i]);
            }
        }
    }

    draw(sprite) {
        for(let i in sprite.children) {
            this.draw(sprite.children[i])
        }

        let relativeX, relativeY;
        let center = sprite.center();

        this.context.beginPath();

        this.context.globalAlpha = sprite.opacity;

        this.context.translate(sprite.x, sprite.y);
        this.context.rotate(sprite.rotation);
        this.context.rect(0, 0, sprite.width, sprite.height);

        this.context.fillStyle = sprite.color;

        this.context.fill();

        if(sprite.texture) {
            relativeX = -sprite.width * sprite.anchor.x;
            relativeY = -sprite.height * sprite.anchor.y;

            this.context.drawImage(this.game.textures[sprite.texture], relativeX, relativeY);
        }


        if(sprite.text && sprite.font) {
            this.context.font = sprite.font;
            this.context.fillStyle = 'black';

            this.context.fillText(sprite.text, relativeX, relativeY);
        }

        this.context.setTransform.call(this.context, this.transformMatrix);
    }

    debugSprite(sprite) {
        for(let i in sprite.children) {
            this.debugSprite(sprite.children[i])
        }

        let info = {
            x: sprite.x,
            y: sprite.y,
            width: sprite.width,
            height: sprite.height
        };

        this.context.font = '14px serif';
        this.context.fillStyle = 'black';

        let yPosition = 0;

        Object.keys(info).forEach((key) => {
            this.context.fillText(`${key}: ${Math.round(info[key])}px`, sprite.x + 10, sprite.y + yPosition);
            yPosition += 15;
        });

        this.context.beginPath();
        this.context.arc(sprite.x, sprite.y, 5, 0, 2 * Math.PI);
        this.context.fill();
    }

    drawCollisionBoxes() {
        this.game.physicsSystem.bodies.forEach((body) => {
            if(body.shape === RigidBody.SHAPES.RECTANGLE) {
                this.drawRectangle(body);
            } else if(body.shape === RigidBody.SHAPES.CIRCLE) {
                this.drawCircle(body)
            }
        });
    }

    drawCircle(body) {
        if(body.collisions.length > 0) {
            this.context.fillStyle = 'rgba(255, 0, 0, 0.5)';
        } else {
            this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
        }

        this.context.beginPath();
        this.context.arc(body.sprite.x, body.sprite.y, body.radius, 0, 2 * Math.PI);
        this.context.fill();
    }

    drawRectangle(body) {
        if(body.collisions.length > 0) {
            this.context.fillStyle = 'rgba(255, 0, 0, 0.5)';
        } else {
            this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
        }

        let drawX = body.sprite.x - (body.sprite.width * body.sprite.anchor.x),
            drawY = body.sprite.y - (body.sprite.height * body.sprite.anchor.y);

        this.context.beginPath();

        this.context.rect(drawX, drawY, body.width, body.height);
        this.context.fill();
    }

    

    loadTexture(gl, url) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
    
        // Because images have to be downloaded over the internet
        // they might take a moment until they are ready.
        // Until then put a single pixel in the texture so we can
        // use it immediately. When the image has finished downloading
        // we'll update the texture with the contents of the image.
        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                    width, height, border, srcFormat, srcType,
                    pixel);
    
        const image = new Image();
        image.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                        srcFormat, srcType, image);
    
        // WebGL1 has different requirements for power of 2 images
        // vs non power of 2 images so check if the image is a
        // power of 2 in both dimensions.
        if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
            // Yes, it's a power of 2. Generate mips.
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            // No, it's not a power of 2. Turn off mips and set
            // wrapping to clamp to edge
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
        };
        image.src = url;
    
        return texture;
    }
}