// canvas start
    var my_canvas=document.createElement('canvas');
    my_canvas.width=window.innerWidth;
    my_canvas.height=window.innerHeight;
    
    document.body.appendChild(my_canvas);
    var ctx=my_canvas.getContext('2d');
    // canvas end -dont change kode above !!!
        
    // event
        var mouse={x: undefined, y: undefined}
        
        window.addEventListener('mousemove', function(event){
            mouse.x=event.x;
            mouse.y=event.y;
        })
        
    // resize canvas 
        window.addEventListener('resize', function(){
            
            my_canvas.width=window.innerWidth;
            my_canvas.height=window.innerHeight;
            
            init();
        })
        
    // randomise
        function rand(min, max){
            return Math.floor(Math.random()*(max-min+1)+min);
        }
        
    // arrayes
        var begin=[];
        var empty=[];
        empty.length=0;
        
    // random color
        var color=[
            '#182847',
            '#1D4778',
            '#E7312F',
            '#FFCFA3',
            '#0D1A26'
        ];
        
    // objects
        function Circle(x,y,radius,sx,sy){
            this.x=x;
            this.y=y;
            this.radius=radius;
            this.sx=sx;
            this.sy=sy;
            this.minRadius=radius;
            this.color=color[rand(0,4)];
            
    // move
            this.update=function(){
                this.y += this.sy;   
                this.x += this.sx;   
                
    // bounce of walls
                if(this.x+this.radius >= my_canvas.width || this.x-this.radius <= 0){
                    this.sx *= (-1);
                }
                if(this.y+this.radius >= my_canvas.height || this.y-this.radius <= 0){
                    this.sy *= (-1);
                }
                
    // zero vector speed !
                if(this.sx == 0){
                    this.sx += 1;
                }
                if(this.sy == 0){
                    this.sy += 1;
                }
                
    // interact
                var maxRadius=40;
                if(mouse.y -this.y < 50 && mouse.y -this.y > -50 && mouse.x -this.x < 50 && mouse.x -this.x > -50){
                    if(this.radius<maxRadius){this.radius +=2}
                }
                else if(this.radius > radius){this.radius -=2}
                
                ctx.fill();
            }
        }
        
        function init(){
    // loop1 (put to arry)
            begin=[];
        for(var i=0;i <900;i++){
            begin.push(new Circle(rand(0,my_canvas.width),rand(0,my_canvas.height),rand(2,4),rand(-1,1),rand(-1,1)));
            }
        }
        
        init();
        
    // animation start
    animation();
    function animation(){
        requestAnimationFrame(animation);
        
    // clear canvas
            ctx.clearRect(0,0,my_canvas.width,my_canvas.height);
        
    // loop2 (drawn circle 1,2,3...)
        for(var j=0;j<begin.length;j++){
            ctx.beginPath();
            ctx.arc(begin[j].x,begin[j].y,begin[j].radius,0,Math.PI*2,false);
            ctx.fillStyle=begin[j].color;
            
            
    // draw on canvas
            begin[j].update();
            
    // glich fix
            if(begin[j].x-begin[j].radius < 0 ){
                begin[j].x=0+begin[j].radius;
            }
            if(begin[j].x+begin[j].radius > my_canvas.width ){
                begin[j].x=my_canvas.width-begin[j].radius;
            }
            if(begin[j].y-begin[j].radius < 0 ){
                begin[j].y=0+begin[j].radius;
            }
            if(begin[j].y+begin[j].radius > my_canvas.height ){
                begin[j].y=my_canvas.width-begin[j].radius;
            }
        }
        
    }