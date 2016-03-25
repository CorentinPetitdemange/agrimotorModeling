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
    scene.add( new THREE.AmbientLight( 0x404040 ) );
    spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.name = 'Spot Light';
    spotLight.angle = Math.PI / 5;
    spotLight.penumbra = 0.3;
    spotLight.position.set( 10, 10, -6 );
    spotLight.castShadow = true;
    spotLight.shadowCameraNear = 8;
    spotLight.shadowCameraFar = 10;
    spotLight.shadowMapWidth = 1024;
    spotLight.shadowMapHeight = 1024;
    scene.add( spotLight );
    //scene.add( new THREE.CameraHelper( spotLight.shadow.camera ) );
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

/* ---------- ROTATING ---------- */
function rotateLeft() {
    if (!mesh)
        return;
    mesh.rotation.y -= SPEED * SPEED_FREQUENSY;
}

function rotateRight() {
    if (!mesh)
        return;
    mesh.rotation.y += SPEED * SPEED_FREQUENSY;
}

function rotate_X_Top() {
    if (!mesh)
        return;
    mesh.rotation.x -= SPEED * SPEED_FREQUENSY;
}

function rotate_X_Bottom() {
    if (!mesh)
        return;
    mesh.rotation.x += SPEED * SPEED_FREQUENSY;
}

function rotate_Z_Left() {
    if (!mesh)
        return;
    mesh.rotation.z -= SPEED * SPEED_FREQUENSY;
}

function rotate_Z_Right() {
    if (!mesh)
        return;
    mesh.rotation.z += SPEED * SPEED_FREQUENSY;
}
/* ---------- END ROTATING ---------- */

/* ---------- SCALE ---------- */
function scale_origin() {
    mesh.scale.set( SCALE_ORIGINAL, SCALE_ORIGINAL, SCALE_ORIGINAL );
}

function scale_x() {
    mesh.scale.x += SCALE_SIZE;
}

function scale_y() {
    mesh.scale.y += SCALE_SIZE;
}

function scale_z() {
    mesh.scale.z += SCALE_SIZE;
}
/* ---------- END SCALE ---------- */

/* ---------- WIREFRAME ---------- */
function wireframe() {
    var egh = new THREE.EdgesHelper( mesh, 0x00ffff );
    egh.material.linewidth = 2;
    scene.add(egh);
}

function abort() {
    location.reload();
}
/* ---------- END WIREFRAME ---------- */

/* ---------- ZOOM ---------- */
function plus() {
    FIELD_OF_VIEW = FIELD_OF_VIEW - ZOOM_RATIO;
    camera = new THREE.PerspectiveCamera(FIELD_OF_VIEW, WIDTH / HEIGHT, 1, 10);
    camera.position.set(5, 3.5, -6);
    camera.lookAt(scene.position);
}

function minus() {
    FIELD_OF_VIEW = FIELD_OF_VIEW + ZOOM_RATIO;
    camera = new THREE.PerspectiveCamera(FIELD_OF_VIEW, WIDTH / HEIGHT, 1, 10);
    camera.position.set(5, 3.5, -6);
    camera.lookAt(scene.position);
}
/* ---------- END ZOOM ---------- */

function extraLight() {
    scene.add( new THREE.AmbientLight( 0x404040 ) );
    secondSpotLight = new THREE.SpotLight( 0xffffff );
    secondSpotLight.name = 'Second Spot Light';
    secondSpotLight.angle = Math.PI / 5;
    secondSpotLight.penumbra = 0.9;
    secondSpotLight.position.set( 1, 1, 1 );
    secondSpotLight.castShadow = true;
    secondSpotLight.shadowCameraNear = 8;
    secondSpotLight.shadowCameraFar = 10;
    secondSpotLight.shadowMapWidth = 1024;
    secondSpotLight.shadowMapHeight = 1024;
    scene.add( secondSpotLight );
    //scene.add( new THREE.CameraHelper( secondSpotLight.shadow.camera ) );
}

function removeLight() {
    location.reload();
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

init();
render();