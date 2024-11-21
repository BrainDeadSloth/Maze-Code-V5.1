
import { Group, Vector3,MeshBasicMaterial, Mesh, BoxGeometry, Box3, TextureLoader } from "three";


import Facey from '../../static/Facey_V4.png';

const isPhone = true;


const rotat = Math.floor(Math.random() * 8) + 1;


const locations = [
    new Vector3(-1.5, 0, -10.5),
    new Vector3(10.5, 0, -10.5),
    new Vector3(-7.5, 0, -7.5),
    new Vector3(4.5, 0, -7.5),
    new Vector3(1.5, 0, -4.5),
    new Vector3(-10.5, 0, -1.5),
    new Vector3(-1.5, 0, -1.5),
    new Vector3(-10.5, 0, 1.5),
    new Vector3(4.5, 0, 1.5),
    new Vector3(7.5, 0, 1.5),
    new Vector3(-7.5, 0, 7.5),
    new Vector3(-1.5, 0, 10.5),
    new Vector3(7.5, 0, 10.5)
];


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
}; 


const shuffledArray = shuffle(locations); 


const walls = new Group();


function createWalls(geom, position, ObjName) {
    const mesh = new Mesh(
        new BoxGeometry(geom.x, geom.y, geom.z),
        new MeshBasicMaterial({color: 0x000000})
    );
    mesh.position.copy(position);
    mesh.name = ObjName;
    walls.add(mesh);
}


// Outer Walls
createWalls(new Vector3(24.25, 0.25, 0.25), new Vector3(0, 0, -12), 'Top');
createWalls(new Vector3(0.25, 0.25, 24.25), new Vector3(12, 0, 0), 'Right');
createWalls(new Vector3(24.25, 0.25, 0.25), new Vector3(0, 0, 12), 'Bot');
createWalls(new Vector3(0.25, 0.25, 24.25), new Vector3(-12, 0, 0), 'Left');

// Col A Horizontal
createWalls(new Vector3(3.25, 0.25, 0.25), new Vector3(-10.5, 0, 0));

// Col A + Col B Vertical
createWalls(new Vector3(0.25, 0.25, 18.25), new Vector3(-9, 0, 0)); // spans Rows 2 - 7

// Col B Horizontal
createWalls(new Vector3(3.25, 0.25, 0.25), new Vector3(-7.5, 0, -9));
createWalls(new Vector3(6.25, 0.25, 0.25), new Vector3(-6, 0, -6)); // spans Col C Horizontal
createWalls(new Vector3(3.25, 0.25, 0.25), new Vector3(-7.5, 0, 3));
createWalls(new Vector3(3.25, 0.25, 0.25), new Vector3(-7.5, 0, 9));

// Col B + Col C Vertical
createWalls(new Vector3(0.25, 0.25, 3.25), new Vector3(-6, 0, -1.5));
createWalls(new Vector3(0.25, 0.25, 3.25), new Vector3(-6, 0, 7.5));

// Col C Horizontal
createWalls(new Vector3(6.25, 0.25, 0.25), new Vector3(-3, 0, 0)); // spns Col D Hozizontal
createWalls(new Vector3(12.25, 0.25, 0.25), new Vector3(0, 0, 6)); // spans Cols D E F

// Col C + D Vertical
createWalls(new Vector3(0.25, 0.25, 3.25), new Vector3(-3, 0, -10.5));
createWalls(new Vector3(0.25, 0.25, 3.25), new Vector3(-3, 0, 10.5));

// Col D Horizontal
createWalls(new Vector3(6.25, 0.25, 0.25), new Vector3(0, 0, -3)); // spans Col E
createWalls(new Vector3(6.25, 0.25, 0.25), new Vector3(0, 0, 3)); // spans Col E
createWalls(new Vector3(3.25, 0.25, 0.25), new Vector3(-1.5, 0, 9));

// Col D + E Vertical
createWalls(new Vector3(0.25, 0.25, 12.25), new Vector3(0, 0, -6)); // spans Rows 1 - 4

// Col E Horizontal
createWalls(new Vector3(6.25, 0.25, 0.25), new Vector3(3, 0, -6)); // spans Col F

// Col E + F Vertical
createWalls(new Vector3(0.25, 0.25, 3.25), new Vector3(3, 0, 1.5));
createWalls(new Vector3(0.25, 0.25, 3.25), new Vector3(3, 0, 7.5));

// Col F Horizontal
createWalls(new Vector3(3.25, 0.25, 0.25), new Vector3(4.5, 0, -9));
createWalls(new Vector3(3.25, 0.25, 0.25), new Vector3(4.5, 0, 0));

// Col F + G Vertical
createWalls(new Vector3(0.25, 0.25, 6.25), new Vector3(6, 0, -6)); // spans Rows 2 - 3
createWalls(new Vector3(0.25, 0.25, 6.25), new Vector3(6, 0, 3)); // spans Rows 2 - 3
createWalls(new Vector3(0.25, 0.25, 3.25), new Vector3(6, 0, 10.5));

// Col G Horizontal
createWalls(new Vector3(3.25, 0.25, 0.25), new Vector3(7.5, 0, 3));
createWalls(new Vector3(3.25, 0.25, 0.25), new Vector3(7.5, 0, 9));

// Col G + H Vertical
createWalls(new Vector3(0.25, 0.25, 3.25), new Vector3(9, 0, -10.5));
createWalls(new Vector3(0.25, 0.25, 9.25), new Vector3(9, 0, -1.5)); // spans Rows 3 - 5
createWalls(new Vector3(0.25, 0.25, 3.25), new Vector3(9, 0, 7.5));


const textureLoader = new TextureLoader();


const Player = new Mesh(
    new BoxGeometry(1.5, 0.25, 1.5), 
    new MeshBasicMaterial({
        map: textureLoader.load(Facey)
    })
);
Player.name = 'Player';


var spawn = shuffledArray[0];
Player.position.copy(shuffledArray[0]);
delete shuffledArray[0];


switch (rotat) {
    case 2:
        Player.rotation.y = Math.PI / 2;
        break;
    case 3:
        Player.rotation.y = -Math.PI;
        break;
    case 4:
        Player.rotation.y = -Math.PI / 2;
        break;
    case 6:
        Player.rotation.y = Math.PI / 2;
        break;
    case 7:
        Player.rotation.y = -Math.PI;
        break;
    case 8:
        Player.rotation.y = -Math.PI / 2;
        break;
    default:
        break;
}


const PlayerBB = new Box3(new Vector3(), new Vector3());
PlayerBB.setFromObject(Player);


export {
    Player, 
    PlayerBB, 
    walls, 
    shuffledArray, 
    spawn,
    rotat,
    isPhone
}
