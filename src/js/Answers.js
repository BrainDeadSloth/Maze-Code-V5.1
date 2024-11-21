// Three JS Imports
import { Group, Mesh, MeshBasicMaterial, BoxGeometry, Box3, Vector3 } from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

// Imports from other JS files
import { PlayerBB, rotat, shuffledArray, isPhone } from './walls';
import { restart } from './Movement';

// defines group Spheres / arraay SpheresBB
const Spheres = new Group();
const SpheresBB = [];

// defines function to create spheres (passing in position) / spheres bounding box
// adds sphere mesh to Spheres group / bounding box to SpheresBB array
function createTextPlaceholder(position, i) {
    const mesh = new Mesh(
        new BoxGeometry(2.75,0.25,2.75),
        new MeshBasicMaterial({color: 0xff0000})
    );
    mesh.position.copy(position);
    Spheres.add(mesh);
    mesh.name = i;

    const meshBB = new Box3(new Vector3(), new Vector3());
    meshBB.setFromObject(mesh)
    SpheresBB.push(meshBB);
}

// defines labels array
var labels = [];

// defines label render so HTML elements can be used / appends it to html body
const LabelRenderer = new CSS2DRenderer();
LabelRenderer.setSize(window.innerWidth, window.innerHeight);
LabelRenderer.domElement.style.position = "absolute";
LabelRenderer.domElement.style.top = "0px";
document.body.appendChild(LabelRenderer.domElement);

// loops 5 times starting at 1
// calls sphere creation function / passes location from shuffles array
// creates paragraph element with class name of showing tooltip / sets text content to unique answer
// creates div container for paragraph
// pushes css2dobject made from div container into labels array
for (let i = 1; i < 6; i++) {
    createTextPlaceholder(shuffledArray[i], i);

    let p = document.createElement("p");
    p.className = 'tooltip show';
    p.setAttribute('style', 'white-space: pre;');
    p.style.textAlign = "center";
    if (isPhone) {
        p.style.fontSize = "0.5em";
    } else {
        p.style.fontSize = "0.9em";
    }
    p.style.fontFamily = "Tahoma, Arial, sans-serif";
    p.textContent = "This is \r\nanswer \r\nnumber "+(i);
    p.id = "answer"+i;
    let pContainer = document.createElement("div");
    pContainer.appendChild(p);
    labels.push( new CSS2DObject(pContainer));
}


const button = document.createElement("button");
const buttonContainer = document.createElement("div");
buttonContainer.appendChild(button);

// sets CSS styling to button / Text showing in button
button.style.borderWidth = "2px";
button.style.borderRadius = "20px";
button.style.background = "#cecece";
button.style.color = "cecece";
button.style.fontFamily = "Tahoma, Arial, sans-serif";
button.style.width = "100%";
button.style.height = "100%";
button.textContent = "Select";

var buttonPos;

if (isPhone) {
    button.style.fontSize = "0.7em";
    button.style.lineHeight = "0.7em";

    // sets CSS width / height of button container
    buttonContainer.style.width = "75px";
    buttonContainer.style.height = "25px";

    buttonPos = 13.325;
} else {
    button.style.fontSize = "0.9em";
    button.style.lineHeight = "0.9em";

    // sets CSS width / height of button container
    buttonContainer.style.width = "100px";
    buttonContainer.style.height = "30px";

    buttonPos = 12.75;
}

// creates variable for css2dobject created from button container
const buttonPointLabel = new CSS2DObject(buttonContainer);

// sets position of button depending on scene rotation
switch (rotat) {
    case 2:
        buttonPointLabel.position.set(12.75, 0, 0);
        break;
    case 3:
        buttonPointLabel.position.set(0, 0, -12.75);
        break;
    case 4:
        buttonPointLabel.position.set(-12.75, 0, 0);
        break;
    case 5:
        buttonPointLabel.position.set(0, 0, -12.75);
        break;
    case 6:
        buttonPointLabel.position.set(-12.75, 0, 0);
        break;
    case 8:
        buttonPointLabel.position.set(12.75, 0, 0);
        break;
    default:
        buttonPointLabel.position.set(0, 0, 12.75);
        break;
}


var selected = [];
var hover, hoverdItem;



button.addEventListener("click", function() {
    console.log(document.getElementsByClassName("tooltip")[0]);
    if (hover) {
        ChangeSelected();
    }
});


function CheckCollisions() {

    if (restart) {
        selected = [];
    }


    for (let i = 0; i < SpheresBB.length; i++) {



        if (PlayerBB.intersectsBox(SpheresBB[i])) {









            hover = true;
            hoverdItem = Spheres.children[i];
            break;

        } else {

            let test = false;
            for (let j = 0; j < selected.length; j++) {
                if (selected[j] === Spheres.children[i]) {
                    test = true;
                    break;
                }
            }


            if (test === false) {
                Spheres.children[i].material.color.set(0xff0000);
            }


            if (rotat < 5) {
                if (Spheres.children[i].position.y < 0) {
                    Spheres.children[i].position.y += 0.1;
                }
            } else {
                if (Spheres.children[i].position.y > 0) {
                    Spheres.children[i].position.y -= 0.1;
                }
            }


            hover = false;
        }
    }

    // console.log(hover, selected);
}


function ChangeSelected() {

    let value;
    let test = false;


    if (selected.length > 0) {


        for (let i = 0; i < selected.length; i++) {
            if (selected[i] == hoverdItem) {
                document.getElementById("answer"+hoverdItem.name).style.color = "#000000";
                test = true;
                value = i;
                break;
            }
        }


        if (test) {


            if (value !== selected.length-1) {
                for (i = value; i < selected.length; i++) {
                    selected[i] = selected[i+1];
                }
            }

            selected.pop();

        } else {

            document.getElementById("answer"+hoverdItem.name).style.color = "#00ff00";
            selected.push(hoverdItem);
        }

    } else {

        document.getElementById("answer"+hoverdItem.name).style.color = "#00ff00";
        selected.push(hoverdItem);
    }
}


export {
    Spheres,
    labels,
    LabelRenderer,
    buttonPointLabel,
    selected,
    CheckCollisions,
    ChangeSelected
}