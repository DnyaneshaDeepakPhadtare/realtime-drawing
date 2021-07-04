nose_x=0;
nose_y=0;

difference=0;
rightWrist_x=0;
leftWrist_x=0;

function setup(){
    video=createCapture(VIDEO);
    video.size(500,500);
    video.position(100,100);

    canvas=createCanvas(550,440);
    canvas.position(700,120);

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("poseNet is initiallized");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        nose_x=results[0].pose.nose.x;
        nose_y=results[0].pose.nose.y;
        console.log("nose x= "+nose_x+",nose y= "+nose_y);

        leftWrist_x=results[0].pose.leftWrist.x;
        rightWrist_x=results[0].pose.rightWrist.x;
        difference=floor(leftWrist_x-rightWrist_x);
        console.log("right wrist x= "+rightWrist_x+", left wrist x= "+leftWrist_x+", difference= "+difference);
    }
}

function draw(){
    background('#fc0303');
    fill('#5c088a');
    stroke('#ebcd23');
    square(nose_x,nose_y,difference);

    document.getElementById("square_side").innerHTML="Lenght of a side of the square is= "+difference+"px";
}

