
document.body.addEventListener('htmx:afterSwap', function(event) {
    console.log("Event triggered");
    if (event.target.contains(document.getElementById('myArchitecture'))) {
        class Line {
            constructor(x1, y1, x2, y2, color) {
                this.x1 = x1;
                this.y1 = y1;
                this.x2 = x2;
                this.y2 = y2;
                this.color = color;
            }
        
            draw(ctx) {
                ctx.strokeStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(this.x1, this.y1);
                ctx.lineTo(this.x2, this.y2);
                ctx.stroke();
            }
            drawArrow(ctx, shortenBy = 50) {  // 'shortenBy' is how much shorter the line should be
                // Calculate the full distance and angle
                const dx = this.x2 - this.x1;
                const dy = this.y2 - this.y1;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx);
        
                // Calculate the new endpoint that is 'shortenBy' pixels shorter
                const shortenRatio = (distance - shortenBy) / distance;
                const newX2 = this.x1 + dx * shortenRatio;
                const newY2 = this.y1 + dy * shortenRatio;
        
                // Draw the main line
                ctx.beginPath();
                ctx.moveTo(this.x1, this.y1);
                ctx.lineTo(newX2, newY2);
                ctx.strokeStyle = this.color;
                ctx.stroke();
        
                // Draw the arrowhead
                let arrowLength = 10; // Length of the arrow head lines
                let arrowWidth = Math.PI / 6; // Width of the angle of the arrow head
                ctx.moveTo(newX2, newY2);
                ctx.lineTo(newX2 - arrowLength * Math.cos(angle - arrowWidth), newY2 - arrowLength * Math.sin(angle - arrowWidth));
                ctx.moveTo(newX2, newY2);
                ctx.lineTo(newX2 - arrowLength * Math.cos(angle + arrowWidth), newY2 - arrowLength * Math.sin(angle + arrowWidth));
                ctx.stroke();
            }
        }
        class Rectangle {
            constructor(x, y, width, height, color,connected_to=[], text="default") {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.color = color;
                this.connected_to = connected_to;
                this.text = text;
            }
        
            draw(ctx) {
                if (this.connected_to) {
                    // draw an arrow from this rectangle to the connected rectangle

          
                    console.log("connected to", this.connected_to);
                    // Assumes connected_to is another Rectangle object
                    for (let i = 0; i < this.connected_to.length; i++) {
                        let new_rect = this.connected_to[i];
                        // draw an arrow from this rectangle to the connected rectangle but not from center to center but from edge to an edge of the connected rectangle
                        let line = new Line(this.x + this.width / 2, this.y + this.height / 2, new_rect.x + new_rect.width / 2, new_rect.y + new_rect.height / 2, 'black');
                        line.drawArrow(ctx);
                    }
                }
                // Draw  border of the rectangle
                console.log("Drawing rectangle", this.x, this.y, this.width, this.height);
                ctx.strokeStyle = 'black'; // Set border color
                ctx.lineWidth = 1; // Set border thickness
                ctx.strokeRect(this.x, this.y, this.width, this.height); // Draw the border

                // Fill the rectangle with a color
                ctx.fillStyle = this.color; // Fill color for the rectangle
                ctx.fillRect(this.x, this.y, this.width, this.height); // Draw the filled rectangle


                // Draw the text
                ctx.fillStyle = 'black'; // Set text color to black
                ctx.font = '0.5rem Roboto'; // Set font size and style
                ctx.textAlign = 'center'; // Align text horizontally centered
                ctx.textBaseline = 'middle'; // Align text vertically centered
        
                // Calculate the center of the rectangle
                let centerX = this.x + this.width / 2;
                let centerY = this.y + this.height / 2;
        
                // Draw the text at the center of the rectangle
                ctx.fillText(this.text, centerX, centerY);

                
            }
        }

        const canvas = document.getElementById('myArchitecture');
        const ctx = canvas.getContext('2d');
        

        let canvas_width = canvas.width;
        let canvas_height = canvas.height;
        let is_dragging = false;
        let startX = 0;
        let startY = 0;

        let shapes = [];
        let current_shape_index = 0;

        shapes.push();


        createShapes = function(shapes) {
            ctx.clearRect(0, 0, canvas_width, canvas_height);
            shapes.forEach(shape => {
                if (shape instanceof Rectangle) {
                    shape.draw(ctx);
                }
                else if (shape instanceof Line) {
                    shape.draw(ctx);
                }  
                else {
                    console.log("Unknown shape");
                }
            });
        };

        function chechHit(shape, mouse_x, mouse_y) {
            let x = shape.x;
            let y = shape.y;
            let width = shape.width;
            let height = shape.height;
            return ((mouse_x >= x && mouse_x <= x + width) && (mouse_y >= y && mouse_y <= y + height));
        }

        let mouse_down = function(event) {
            console.log("Mouse down");
            event.preventDefault();
            
            startX = parseInt(event.clientX);
            startY = parseInt(event.clientY);


            let rect = canvas.getBoundingClientRect();
            let canvas_x = rect.x;
            let canvas_y = rect.y + window.scrollY;


            let x = startX - canvas_x;
            let y = startY - canvas_y;

            startX = x;
            startY = y;

            let is_hit = false;

            let index = 0;
            for (shape of shapes) {
                is_hit = chechHit(shape, x, y);
                if (is_hit && shape instanceof Rectangle) {
                    console.log("Hit");
                    current_shape_index = index;
                    is_dragging = true;
                    return;
                }
                index++;
            }
        } 

        let mouse_up = function(event) {

            if (!is_dragging) {
                return;
            }
            event.preventDefault();
            is_dragging = false; 
        }

        let mouse_out = function(event) {

            if (!is_dragging) {
                return;
            }
            event.preventDefault();
            is_dragging = false; 
        }

        let mouse_move = function(event) {
            if (!is_dragging) {
                return;
            }
            else {
                event.preventDefault();
                let mouseX = parseInt(event.clientX);
                let mouseY = parseInt(event.clientY);

                let rect = canvas.getBoundingClientRect();
                let canvas_x = rect.x;
                let canvas_y = rect.y + window.scrollY;



                let x = mouseX - canvas_x;
                let y = mouseY - canvas_y;


                let dx = x - startX;
                let dy = y - startY;

                shapes[current_shape_index].x += dx;
                shapes[current_shape_index].y += dy;

                createShapes(shapes);

                startX = x;
                startY = y;
            }

        }

        let reactive_rect = new Rectangle(10, 400, 100, 50, '#FFEFFD', null, "HTMX Reactive");
  
        let orm_rect = new Rectangle(200, 100, 100, 50, '#FFEFFD', null, "ORM");
        let template_engine_rect = new Rectangle(200, 200, 100, 50, '#FFEFFD', null, "Template Engine");
        let basecomponent = new Rectangle(100, 300, 100, 50, '#FFEFFD', [template_engine_rect, orm_rect, reactive_rect], "Base Component");
        
        let component_rect_b = new Rectangle(400, 300, 100, 50, '#FFEFFD', [basecomponent], "Component B");
        let component_rect_a = new Rectangle(250, 350, 100, 50, '#FFEFFD', [basecomponent], "Component A");

        let view_rect = new Rectangle(350, 200, 100, 50, '#FFEFFD', [component_rect_a, component_rect_b, orm_rect, template_engine_rect], "Custom View");
        let dispatcher_rect = new Rectangle(370, 100, 100, 50, '#FFEFFD', [view_rect], "Dispatcher");
        let baseview_rect = new Rectangle(310, 10, 100, 50, '#FFEFFD', [dispatcher_rect], "BaseView");
        let router_rect = new Rectangle(160, 10, 100, 50, '#FFEFFD', [baseview_rect], "Router");
        let ui_rect = new Rectangle(10, 10, 100, 50, '#FFEFFD', [router_rect], "UI Request");
        shapes.push(ui_rect);
        shapes.push(router_rect);
        shapes.push(baseview_rect);
        shapes.push(dispatcher_rect);
        shapes.push(view_rect);
        shapes.push(component_rect_a);
        shapes.push(component_rect_b);
        shapes.push(orm_rect);
        shapes.push(template_engine_rect)
        shapes.push(basecomponent);
        shapes.push(reactive_rect);
        createShapes(shapes);
        canvas.onmousedown = mouse_down
        canvas.onmouseup = mouse_up;
        canvas.onmouseout = mouse_out;
        canvas.onmousemove = mouse_move;


        
    }
});