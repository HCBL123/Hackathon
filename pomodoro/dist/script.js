//Set background color
 $("body").css("background","rgb(0, 153, 204)");
 $("h1").css("font-family","Lobster");
 $("h1").css("font-size","40px");
 $("p").css("font-family","Lobster");
 $("p").css("font-size","20px");
 $("p").css("text-align","center");

//CREATE CANVAS and ANIMATION
//Describe global variables 

//assign canvas element
var canvas = document.getElementById('tutorial');

//set animation control parameters
var i = 0;
var imax;
var raf;
var clickCount=0;
var nIntervId;

//variables to control the animation timers: activity duration, start, stop and remaining time control
var currentTime;
var start=0;
var stop=0;
var remainderTime=parseInt($("#sessionTime").attr("value"))*60;
var passedTime=0;
var pauseActive=false;
var sessionActive=false;
var activityDuration=parseInt($("#sessionTime").attr("value"))*60;
var pauseClick=0;

//Set color control parameters
var colBreakPoint1=0;
var colBreakPoint2=1;

//Draw on to the canvas
function draw(timestamp) {
  
  //Check if canvas exists
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
  }
  
  //Start saving 
  ctx.save();
  
  //set the change points for colors 
  if(1-remainderTime/activityDuration<0.7){
    colBreakPoint1=1-remainderTime/activityDuration;
    colBreakPoint2=0;
  }
  else if(1-remainderTime/activityDuration<0.9){
    colBreakPoint1=1-remainderTime/activityDuration;
    colBreakPoint2=1-remainderTime/activityDuration;
  }
  else if(1-remainderTime/activityDuration<1){
    colBreakPoint1=1;
    colBreakPoint2=1-remainderTime/activityDuration;
  }
  else{
    colBreakPoint1=1;
    colBreakPoint2=1-remainderTime/activityDuration;
  }
  
  //Clean the canvas
  clear(ctx);
  
  //Put the outer circle ans save this subpart
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(canvas.width/2,canvas.height/2);
  ctx.fillStyle = 'rgba(' + Math.floor(0 + colBreakPoint1*255) + ',' +  Math.floor(255 - colBreakPoint2*255) + ',0,0.5)';
  ctx.arc(canvas.width/2,canvas.height/2, canvas.width/2, Math.PI *(2*(1-remainderTime/activityDuration)), Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
  ctx.restore();

  //Put inner Circle and save this subpart
  ctx.save();
  ctx.moveTo(canvas.width/2,canvas.height/2);
  ctx.beginPath();
  ctx.fillStyle = 'rgb(' + Math.floor(0 + colBreakPoint1*255) + ',' + Math.ceil(204-colBreakPoint2*204) + ',0)';
  ctx.arc(canvas.width/2,canvas.height/2, canvas.width/2-50, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.rotate(i/imax+10);
  ctx.closePath();
  ctx.restore();
  
  //Put the progress arc and save this subpart
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(canvas.width/2,canvas.height/2);
  ctx.fillStyle = 'rgba(' + Math.floor(0 + colBreakPoint1*255) + ',' + Math.floor(204 - colBreakPoint2*204) + ',0,0.9)';
  ctx.arc(canvas.width/2,canvas.height/2, canvas.width/2, 0, Math.PI *(2*(1-remainderTime/activityDuration)), false);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
  
  //Put the count down text and save this subpart
  ctx.save();
  ctx.beginPath();
  ctx.font = "32px serif";
  ctx.textAlign="center";
  if (pauseActive===true){
    var text="Pause";
  }
  else{
    var text="Session";
  }
   // Put the Timer text
  ctx.fillText(text,canvas.width/2,canvas.height/2-20+15);
  ctx.restore();
  ctx.save();
  
  ctx.beginPath();
  ctx.font = "32px serif";
  ctx.textAlign="center";
  
  //Change the format depending on the digit counts of minutes and seconds
  if (Math.floor(remainderTime%60) < 10) {
     var seconds = '0' + Math.floor(remainderTime%60);
  }
  else{      
    var seconds=Math.floor(remainderTime%60);
  }
  
  if (Math.floor(remainderTime/60) ===0) {
    ctx.fillText(''+seconds,canvas.width/2,canvas.height/2+40);
  }
  else{
    var minutes=Math.floor(remainderTime/60);
    ctx.fillText(''+minutes+':'+seconds,canvas.width/2,canvas.height/2+40);
  }
  ctx.restore();
  ctx.restore();
  
  //Update the remaining time to control the animation
  currentTime=new Date();  
  //Update the remaining animation time
  if(start!==0) 
  {
    passedTime=activityDuration-(stop-currentTime.getTime()/1000);
    remainderTime=Math.max(0,stop-currentTime.getTime()/1000)
  };

  //Control when to stop, reinitiate the animation
  if (remainderTime > 0 && clickCount%2===1) {
      raf=window.requestAnimationFrame(draw);
      i++;
  }
  else if (remainderTime <=0){
     i=0;
     clickCount=0;  
     // Change the session and pause state activeness to control the timers
     if(sessionActive===true){
        sessionActive=false;
        pauseActive=true;
     }
     else if(pauseActive===true){
        pauseActive=false;
     }  
     //Call animation to continue with Pause or Session
     i++;
     animationRun();
   }
  //console.log("First click Count:",clickCount,"Session Active:",sessionActive,"Pause Active:",pauseActive);
}

document.addEventListener('DOMContentLoaded', function() {
  //Do the initial state drawing
    raf = window.requestAnimationFrame(draw);
    document.getElementById("firstPlus").addEventListener("click",addition);
    document.getElementById("firstMinus").addEventListener("click",subtraction);
    document.getElementById("secondPlus").addEventListener("click",addition);
    document.getElementById("secondMinus").addEventListener("click",subtraction);
});

//clear the canvas
function clear(ctx) {
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

//call the animation on click on to the canvas
canvas.addEventListener("click", animationRun);


//the code to start, pause, rerun and stop the animation
function animationRun(){
  clickCount++;
  //console.log("2nd click Count:",clickCount,"Session Active:",sessionActive,"Pause Active:",pauseActive, "ClickCount:", clickCount);
  //Check if we are in active session or pause session and set the timers accordingly and call the animation
  if(sessionActive===false && clickCount<=1){
        if (pauseActive===false) {
          sessionActive=true;
          remainderTime = parseInt($("#sessionTime").attr("value")) * 60;
          activityDuration = parseInt($("#sessionTime").attr("value")) * 60;
        } 
        else if(pauseActive===true){
          sessionActive=false;
          remainderTime = parseInt($("#pauseTime").attr("value")) * 60;
          activityDuration = parseInt($("#pauseTime").attr("value")) * 60;
        }
        passedTime = 0;
    //Set the start and stop times again
    currentTime=new Date();
    start = currentTime.getTime()/1000;
    stop = start+remainderTime;
    //call the animation
    raf = window.requestAnimationFrame(draw);
  }
  else if(clickCount>1 && i>1){
    //to pause the simulation
    pauseClick++;
    if (pauseClick%2===1)
    {
      //to stop the animation
      window.cancelAnimationFrame(raf);
    }
    else{
      //to restart the animation
      //reset the timers
      currentTime=new Date();
      start= currentTime.getTime()/1000;
      stop = start+remainderTime;
      raf  = window.requestAnimationFrame(draw);
    }
  }
};


function addition(){
 //on click increase the pause or session time 
  var result;
  if(this.id==="firstPlus"){
    result=$("#pauseTime").attr("value");
    result=parseInt(result)+1;
    $("#pauseTime").attr("value",result);
  }
  else{
    result=$("#sessionTime").attr("value");
    result=parseInt(result)+1;
    $("#sessionTime").attr("value",result);
    reset();
  }
}

function subtraction(){
 //on click decrease the pause or session time 
  var result;
  if(this.id==="firstMinus"){
    result=$("#pauseTime").attr("value");
    result=Math.max(1,parseInt(result)-1);
    $("#pauseTime").attr("value",result);
  }
  else{
    result=$("#sessionTime").attr("value");
    result=Math.max(1,parseInt(result)-1);
    $("#sessionTime").attr("value",result);
    reset();
  }
}

//to reinitiate tthe simulation during rest
function reset(){
  window.cancelAnimationFrame(raf);
  currentTime;
  start=0;
  stop=0;
  remainderTime=parseInt($("#sessionTime").attr("value"))*60;
  passedTime=0;
  pauseActive=false;
  sessionActive=false;
  activityDuration=parseInt($("#sessionTime").attr("value"))*60;
  pauseClick=0;
  clickCount=0;
  i=0;
  draw();
}