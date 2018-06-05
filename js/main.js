var scene, camera, renderer;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.01;
var SPEED_FREQUENSY = 5;

var SCALE_SIZE = 0.01;
var SCALE_ORIGINAL = 0.5;

var FIELD_OF_VIEW = 45;
var ZOOM_RATIO = 1;


function init() {
    scene = new THREE.Scene();
    initMesh();
    initCamera();
    initLights();
    initRenderer();
    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(FIELD_OF_VIEW, WIDTH / HEIGHT, 1, 10);
    camera.position.set(5, 3.5, -6);
    camera.lookAt(scene.position);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setClearColor(0x404040, 1);
    renderer.setSize(WIDTH, HEIGHT);
}

function initLights() {
    lightConstructor('Spot Light', 0.3, { x: 10, y: 10, z: -6 });
    lightConstructor('Second Spot Light', 0.9, { x: 1, y: 1, z: 1 });
}

var mesh = null;
function initMesh() {
    var loader = new THREE.JSONLoader();

    loader.load('../model.json', function(geometry, materials) {
        mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        mesh.scale.x = mesh.scale.y = mesh.scale.z = SCALE_ORIGINAL;
        mesh.translation = THREE.GeometryUtils.center(geometry);
        scene.add(mesh);
    });
}

function rotate(axis, direction) {
    if (!mesh)
        return;

    var ratio = SPEED * SPEED_FREQUENSY;

    if (direction) {
        mesh.rotation[axis] += ratio;
    } else {
        mesh.rotation[axis] -= ratio;
    }
}

function scale_origin() {
    mesh.scale.set( SCALE_ORIGINAL, SCALE_ORIGINAL, SCALE_ORIGINAL );
}

function scale(axis) {
    mesh.scale[axis] += SCALE_SIZE;
}

function wireframe() {
    var egh = new THREE.EdgesHelper( mesh, 0x00ffff );
    egh.material.linewidth = 2;
    scene.add(egh);
}

function zoom(direction) {
    direction ? FIELD_OF_VIEW -= ZOOM_RATIO : FIELD_OF_VIEW += ZOOM_RATIO;
    camera = new THREE.PerspectiveCamera(FIELD_OF_VIEW, WIDTH / HEIGHT, 1, 10);
    camera.position.set(5, 3.5, -6);
    camera.lookAt(scene.position);
}

function extraLight() {
    lightConstructor('Second Spot Light', 0.9, { x: 1, y: 1, z: 1});
}

function lightConstructor(name, penumbra, position) {
    scene.add( new THREE.AmbientLight( 0x404040 ) );
    spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.name = name;
    spotLight.angle = Math.PI / 5;
    spotLight.penumbra = penumbra;
    spotLight.position.set( position.x, position.y, position.z );
    spotLight.castShadow = true;
    spotLight.shadowCameraNear = 8;
    spotLight.shadowCameraFar = 10;
    spotLight.shadowMapWidth = 1024;
    spotLight.shadowMapHeight = 1024;
    scene.add( spotLight );
}

function reload() {
    location.reload();
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

init();
render();
