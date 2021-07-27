import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
import { Enemy } from './enemy.js';
import { Player } from './player_controller.js';

class ThreeTest {

    constructor() {
        this.enemies = [];

        this._initialize();
        this.animate();
    }

    _initialize() {
        this.scene = new THREE.Scene();
        // this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight);
        this.camera = new THREE.OrthographicCamera( window.innerWidth / - 75, window.innerWidth / 75, window.innerHeight / 75, window.innerHeight / - 75, 1, 200 );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(1536, 768);
        document.getElementById('game-wrapper').appendChild(this.renderer.domElement);

        var axesHelper = new THREE.AxesHelper(50);
        this.scene.add(axesHelper);

        this.ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(10000, 10000), new THREE.MeshBasicMaterial({ color: 0x474747, }));
        this.ground.position.y = -0.6;
        this.ground.rotation.x = - Math.PI / 2;
        this.ground.receiveShadow = true;
        this.scene.add(this.ground);

       

        this.camera.position.z = 0;
        this.camera.position.x = 0;
        this.camera.position.y = 20;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        
        this.player = new Player(this.scene, this.camera, this.ground);

        var enemy = new Enemy(this.scene, 10, 0);
        this.enemies.push(enemy);
        var enemy2 = new Enemy(this.scene);
        this.enemies.push(enemy2);
        
    }

    /**
     * Game rendering loop
     */
    animate() {
        requestAnimationFrame(this.animate.bind(this));

        this.player.updatePlayer();

        this.renderer.render(this.scene, this.camera);
    }

    

}

let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
    _APP = new ThreeTest();
});