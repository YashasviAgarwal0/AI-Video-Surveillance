vd = "";
status1 = "";
objects = [];

function preload()
{
    vd = createVideo('video.mp4');
    vd.hide();
}

function setup()
{
    canvas = createCanvas(480, 280);
    canvas.center();
}

function draw()
{
    image(vd, 0, 0, 480, 280);

    if(status1!= "")
    {
        od.detect(vd, gotResults);
        for(var i=0;i<objects.length;i++)
        {
           document.getElementById('status').innerHTML = 'Status : Objects Detected';
           document.getElementById('number').innerHTML = 'Number of objects detected : '+ objects.length;
           fill('red');
           per = Math.floor(objects[i].confidence *100);
           t = objects[i].label + " " + per + " % ";
           text(t, objects[i].x+15, objects[i].y+15);
           noFill();
           stroke('red');
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function startButton()
{
    od = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById('status').innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log('Model is Loaded!');
    status1 = true;
    vd.loop();
    vd.speed(1);
    vd.volume(1);
}

function gotResults(error, results)
{
    if(error)
    {
       console.log(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}