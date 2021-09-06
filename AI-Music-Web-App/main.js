song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristscore = 0;
rightWristscore  = 0;
song1status = "";
song2status = "";
function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(600,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,500,600);
   if(leftWristscore>0.2){
    fill('pink');
    stroke('red');
    circle(leftWristX,leftWristY,20);
    song1status = isPlaying();
    song2.stop();
    if(song1status==false){
        song1.play();
        document.getElementById("song_name").innerHTML="song 1 = "+"harry potter theme song";
   }
   }
}
   if(rightWristscore>0.2){
    fill('pink');
    stroke('red');
    circle(rightWristX,rightWristY,20);
    song2status = isPlaying();
    song1.stop();
    if(song2status==false){
        song2.play();
        document.getElementById("song_name").innerHTML="song 2 = "+"peter pan song";
   }
}
function modelLoaded(){
    console.log("Posenet is initialized");
}
function play(){
    song1.play();
    song1.setVolume(0.5);
    song1.rate(1.0);
}
function gotPoses(results){
    if(results.length>0){
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("leftWristX = "+leftWristX);
        console.log("leftWristY = "+leftWristY);
        console.log("rightWristX = "+rightWristX);
        console.log("rightWristY = "+rightWristY);
        leftWristscore = results[0].pose.keypoints[9].score;
        rightWristscore = results[0].pose.keypoints[10].score;
    }
}