
objects = [];
status = "";
video = "";
thing = "";


function preload()
{
    video = createCapture(VIDEO);
    video.hide();
}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw()
{
    image(video, 0 , 0 , 480 , 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++)
        {
            console.log("Number of Objects Detected : " + objects.length)

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == thing) {
                document.getElementById("status").innerHTML = thing + " is Detected"
            } else {
                document.getElementById("status").innerHTML = thing + " is not Detected"
            }
        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    console.log("Starting detecting");
    thing = document.getElementById("tt").value;
}

function modelLoaded()
{
    console.log("ModelLoaded");
    status = true;
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;

}