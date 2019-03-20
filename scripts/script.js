/*
Welcome to scripting in Spark AR Studio!
From making things move to triggering audio clips,
reactive programming can help you achieve your scripting goals.

Helpful links:

Scripting Basics - https://fb.me/spark-scripting-basics
Reactive Programming - https://fb.me/spark-reactive-programming
Changelogs - https://fb.me/spark-changelog

Note: Feel free to delete the contents of this script and start from scratch.
*/

// How to load in modules, complete list - https://fb.me/spark-scripting-reference
const Diagnostics = require('Diagnostics');
const FaceTracking = require('FaceTracking');
const Scene = require('Scene');
const Reactive = require('Reactive');
const SceneUnderstanding = require('SceneUnderstanding');


// How to access scene objects
const directionalLight = Scene.root.find('directionalLight0');

// How to bind signals
directionalLight.intensity = FaceTracking.face(0).cameraTransform.rotationZ;
/*
Tilting your head to the left and right will increase/decrease the directional light's instensity
Note: You will have to add an object that reacts to light to the scene in order to see this, e.g.
a plane with a default material.
*/

// How to log values to the console
Diagnostics.log('I am a console message logged from the script');

// How to watch Signals in the console
Diagnostics.watch("Mouth Openness - ", FaceTracking.face(0).mouth.openness);

const indoorCats = ['BEDROOM', 'CLASSROOM', 'DESK', 'KITCHEN', 'INDOOR', 'LIVINGROOM', 'OFFICE'];
const outdoorCats = ['BEACH', 'BUS', 'BUSH', 'CAR', 'CLOUD', 'GARAGEOUTSIDE', 'GARDEN', 'GRASS', 'MOTORCYCLE', 'OUTDOOR', 'SKYSCRAPER', 'TREE'];

let indoorSigs = SceneUnderstanding.category(SceneUnderstanding.SceneCategories.KITCHEN).found;

for(const catString of indoorCats) {
    const cat = SceneUnderstanding.SceneCategories[catString];
    const catSig = SceneUnderstanding.category(cat).found;
    catSig
        .monitor()
        .subscribe((val)=> {
            Diagnostics.log(catString);
            Diagnostics.log(val);
        });
    Diagnostics.log(cat);
}

