
import { Raycaster, Vector3 } from "three";


import { Player, walls, spawn, rotat, isPhone } from "./walls";
import { Spheres } from "./Answers";


var restart = false;


var keyLeft = false;
var keyUp = false;
var keyRight = false;
var keyDown = false;


document.onkeydown = function(e) {
    // 
    var ascii = e.keyCode;

    // 
    if (ascii == 37 || ascii == 65 || ascii == 97) {
        keyLeft = true;
    }
    // 
    if (ascii == 38 || ascii == 87 || ascii == 119) {
        keyUp = true;
    }
    // 
    if (ascii == 39 || ascii == 68 || ascii == 100) {
        keyRight = true;
    }
    // 
    if (ascii == 40 || ascii == 83 || ascii == 115) {
        keyDown = true;
    }

    // 
    if (ascii == 82 || ascii == 114) {
        Player.position.copy(spawn);
        for (let i = 0; i < Spheres.children.length; i++) {
            Spheres.children[i].material.color.set(0xff0000);
        }
        restart = true;
    }

    console.log(ascii);
}


document.onkeyup = function(e) {

    var ascii = e.keyCode;


    if (ascii == 37 || ascii == 65 || ascii == 97) {
        keyLeft = false;
    }

    if (ascii == 38 || ascii == 87 || ascii == 119) {
        keyUp = false;
    }

    if (ascii == 39 || ascii == 68 || ascii == 100) {
        keyRight = false;
    }

    if (ascii == 40 || ascii == 83 || ascii == 115) {
        keyDown = false;
    }


    if (ascii == 82 || ascii == 114) {
        restart = false;
    }
}

var startX, startY, moveX, moveY;

document.ontouchstart  = function(e) {
    // console.log(e);
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
}

document.addEventListener("touchmove", function(e) {
    e.preventDefault();
    // console.log(e);
    moveX = e.touches[0].clientX;
    moveY = e.touches[0].clientY;
}, { passive: false });

document.ontouchend = function(e) {
    startX = undefined;
    startY = undefined;
    moveX = undefined;
    moveY = undefined;
}


var raycaster = new Raycaster();
var intersects;
var direction = new Vector3();
var rayStart, rayTarget;


const speed = 0.5;


function checkWalls() {

    let allow = true;


    for (let i = 0; i < rayTarget.length; i++) {

        raycaster.set(rayStart[i], direction.subVectors(rayTarget[i], rayStart[i]).normalize());
        intersects = raycaster.intersectObjects(walls.children);


        if (intersects[0] !== undefined) {
            if (intersects[0].distance < 0.9) {
                allow = false;
            }
        }
    }

    return allow;
}



function setArraysVert(integers) {

    rayStart = [];
    rayTarget = [];


    rayStart.push(new Vector3( Player.position.x - 0.75, Player.position.y, Player.position.z ));
    rayStart.push(new Vector3( Player.position.x - 0.5, Player.position.y, Player.position.z ));
    rayStart.push(new Vector3( Player.position.x - 0.25, Player.position.y, Player.position.z ));
    rayStart.push(new Vector3( Player.position.x, Player.position.y, Player.position.z ));
    rayStart.push(new Vector3( Player.position.x + 0.25, Player.position.y, Player.position.z ));
    rayStart.push(new Vector3( Player.position.x + 0.5, Player.position.y, Player.position.z ));
    rayStart.push(new Vector3( Player.position.x + 0.75, Player.position.y, Player.position.z ));


    rayTarget.push(new Vector3( Player.position.x - 0.75, 0, integers ));
    rayTarget.push(new Vector3( Player.position.x - 0.5, 0, integers ));
    rayTarget.push(new Vector3( Player.position.x - 0.25, 0, integers ));
    rayTarget.push(new Vector3( Player.position.x, 0, integers ));
    rayTarget.push(new Vector3( Player.position.x + 0.25, 0, integers ));
    rayTarget.push(new Vector3( Player.position.x + 0.5, 0, integers ));
    rayTarget.push(new Vector3( Player.position.x + 0.75, 0, integers ));
}


function setArraysHori(integers) {

    rayStart = [];
    rayTarget = [];


    rayStart.push(new Vector3( Player.position.x, Player.position.y, Player.position.z - 0.75 ));
    rayStart.push(new Vector3( Player.position.x, Player.position.y, Player.position.z - 0.5 ));
    rayStart.push(new Vector3( Player.position.x, Player.position.y, Player.position.z - 0.25 ));
    rayStart.push(new Vector3( Player.position.x, Player.position.y, Player.position.z ));
    rayStart.push(new Vector3( Player.position.x, Player.position.y, Player.position.z + 0.25 ));
    rayStart.push(new Vector3( Player.position.x, Player.position.y, Player.position.z + 0.5 ));
    rayStart.push(new Vector3( Player.position.x, Player.position.y, Player.position.z + 0.75 ));


    rayTarget.push(new Vector3( integers, 0, Player.position.z - 0.75 ));
    rayTarget.push(new Vector3( integers, 0, Player.position.z - 0.5 ));
    rayTarget.push(new Vector3( integers, 0, Player.position.z - 0.25 ));
    rayTarget.push(new Vector3( integers, 0, Player.position.z ));
    rayTarget.push(new Vector3( integers, 0, Player.position.z + 0.25 ));
    rayTarget.push(new Vector3( integers, 0, Player.position.z + 0.5 ));
    rayTarget.push(new Vector3( integers, 0, Player.position.z + 0.75 ));
}


function movement() {
    if (isPhone) {
        // console.log(startX, startY, moveX, moveY);
        if (startX > moveX) {
            keyLeft = true;
        } else {
            keyLeft = false;
        }
        if (startX < moveX) {
            keyRight = true;
        } else {
            keyRight = false;
        }
        if (startY > moveY) {
            keyUp = true;
        } else {
            keyUp = false;
        }
        if (startY < moveY) {
            keyDown = true;
        } else {
            keyDown = false;
        }

        startX = moveX;
        startY = moveY;
    }
    // checks if key left / up / right / down is true
    // if true defines local variable allow / calls horizontal or vertical arrays functions depending on scene rotation
    // calls check walls function setting local allow as returned value
    // if allow is true moves player by speed variable along x or z axis depending on key pressed and scene rotation
    if (keyLeft) {
        let allow;
            switch (rotat) {
                case 1:
                    setArraysHori(-15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.x -= speed;
                    }
                    break;
                case 2:
                    setArraysVert(15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.z += speed;
                    }
                    break;
                case 3:
                    setArraysHori(15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.x += speed;
                    }
                    break;
                case 4:
                    setArraysVert(-15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.z -= speed;
                    }
                    break;
                case 5:
                    setArraysHori(-15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.x -= speed;
                    }
                    break;
                case 6:
                    setArraysVert(15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.z += speed;
                    }
                    break;
                case 7:
                    setArraysHori(15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.x += speed;
                    }
                    break;
                case 8:
                    setArraysVert(-15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.z -= speed;
                    }
                    break;
                default:
                    setArraysHori(-15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.x -= speed;
                    }
                    break;
            }
    }

    if (keyUp) {
        let allow;
            switch (rotat) {
                case 1:
                    setArraysVert(-15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.z -= speed;
                    }
                    break;
                case 2:
                    setArraysHori(-15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.x -= speed;
                    }
                    break;
                case 3:
                    setArraysVert(15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.z += speed;
                    }
                    break;
                case 4:
                    setArraysHori(15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.x += speed;
                    }
                    break;
                case 5:
                    setArraysVert(15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.z += speed;
                    }
                    break;
                case 6:
                    setArraysHori(15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.x += speed;
                    }
                    break;
                case 7:
                    setArraysVert(-15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.z -= speed;
                    }
                    break;
                case 8:
                    setArraysHori(-15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.x -= speed;
                    }
                    break;
                default:
                    setArraysVert(-15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.z -= speed;
                    }
                    break;
            }
    }

    if (keyRight) {
        let allow;
            switch (rotat) {
                case 1:
                    setArraysHori(15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.x += speed;
                    }
                    break;
                case 2:
                    setArraysVert(-15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.z -= speed;
                    }
                    break;
                case 3:
                    setArraysHori(-15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.x -= speed;
                    }
                    break;
                case 4:
                    setArraysVert(15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.z += speed;
                    }
                    break;
                case 5:
                    setArraysHori(15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.x += speed;
                    }
                    break;
                case 6:
                    setArraysVert(-15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.z -= speed;
                    }
                    break;
                case 7:
                    setArraysHori(-15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.x -= speed;
                    }
                    break;
                case 8:
                    setArraysVert(15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.z += speed;
                    }
                    break;
                default:
                    setArraysHori(15);
                    allow = checkWalls();

                    if (allow) {
                        Player.position.x += speed;
                    }
                    break;
            }
    }

    if (keyDown) {
        let allow;
        switch (rotat) {
            case 1:
                setArraysVert(15);
                allow = checkWalls();

                if (allow) {
                    Player.position.z += speed;
                }
                break;
            case 2:
                setArraysHori(15);
                allow = checkWalls();

                if (allow) {
                    Player.position.x += speed;
                }
                break;
            case 3:
                setArraysVert(-15);
                allow = checkWalls();

                if (allow) {
                    Player.position.z -= speed;
                }
                break;
            case 4:
                setArraysHori(-15);
                allow = checkWalls();

                if (allow) {
                    Player.position.x -= speed;
                }
                break;
            case 5:
                setArraysVert(-15);
                allow = checkWalls();

                if (allow) {
                    Player.position.z -= speed;
                }
                break;
            case 6:
                setArraysHori(-15);
                allow = checkWalls();

                if (allow) {
                    Player.position.x -= speed;
                }
                break;
            case 7:
                setArraysVert(15);
                allow = checkWalls();

                if (allow) {
                    Player.position.z += speed;
                }
                break;
            case 8:
                setArraysHori(15);
                allow = checkWalls();

                if (allow) {
                    Player.position.x += speed;
                }
                break;
            default:
                setArraysVert(15);
                allow = checkWalls();

                if (allow) {
                    Player.position.z += speed;
                }
                break;
        }
    }
}


export {
    movement,
    restart
}