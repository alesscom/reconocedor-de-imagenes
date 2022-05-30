var img = "";
var objects =[];
var status ="";
function preload(){
    img = loadImage('dog_cat.jpg');
}
function setup(){
    canvas= createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "status: detectando objetos";
}
function draw(){
    image(img, 0,0 , 640, 420);
    if(status != ""){
        for(i = 0;  i < objects.length; i++){
            document.getElementById("status").innerHTML= "estatus: objeto detectado"
            //para cambiar de color//
            fill("red");
            porcentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " "+ porcentage+ "%", objects[i].x+15,objects[i].y);
            stroke("red");
            noFill();
            rect(objects[i].x-15,objects[i].y-25,objects[i].width-75,objects[i].height);
        }
    }
}
function modelLoaded(){
    console.log("modelo cargado");
    status = "true";
    objectDetector.detect(img, gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects =results;
    }
}