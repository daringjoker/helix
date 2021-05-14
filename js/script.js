let canvas=document.querySelector("#mycanvas");
let ctx=canvas.getContext("2d");

let num_strands=2;
let num_rows=10;
let num_cols=20;
let radius=12;


let canvas_padding=canvas.height/4;
let ball_dist=radius*10;

let helix_radius=canvas.height*2;
let current_phase=0;

function resize(){
    console.log("hello world");
    ctx.canvas.width=window.innerWidth;
    ctx.canvas.height=window.innerHeight;
}

function scale(x, from_low,from_high, to_low, to_high)
{
    // this function scales a value x from the range (from_low,from_high) to the range (to_low , to_high)
    return to_low+((x-from_low)/(from_high-from_low))*(to_high-to_low)
}


function nextframe()
{
    //clearing background
    ctx.fillStyle="#000";
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fill();

    //request next frame now just to keep the animation going
    let phase=requestAnimationFrame(nextframe);
    current_phase=0.03*phase;

    //start drawing
    for(let strand=0;strand<num_strands;strand++)
    {
        let st_offset=scale(strand,0,num_strands,0,2*Math.PI)+current_phase;
        for (let col=0;col<num_cols;col++)
        {
            let col_angle=scale(col,0,num_cols,0,2*Math.PI);
            let x=scale(col,0,num_cols,canvas_padding,canvas.width-canvas_padding);
            for(let row=0;row<num_rows;row++)
            {
                var y =helix_radius* Math.sin(st_offset+col_angle)+row*radius*4;
                y=scale(y,-helix_radius,helix_radius+num_rows*radius*4,canvas_padding,canvas.height-canvas_padding)
                var r=radius*(Math.cos(st_offset+col_angle)+1)/2 ;
                let alfa=r/radius;
                //drawing the dots at the specified position
                ctx.beginPath();
                ctx.arc(x,y,r,0,2*Math.PI);
                ctx.fillStyle=`hsl(${(1-alfa)*360},100%,50%)`;
                ctx.fill()
                ctx.closePath();
            }
        }
    }
}

resize();
addEventListener("resize",resize);
requestAnimationFrame(nextframe);
