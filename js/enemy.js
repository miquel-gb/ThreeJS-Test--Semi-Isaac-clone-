import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

export class Enemy {
    constructor(scene, x = 0, z = 0) {

        // Vars init
        this._keys = { up: false, down: false, left: false, right: false };
        this._enemyVelocity = { x: 0, y: 0, z: 0 };
        this._enemyInitialX = x;
        this._enemyInitialZ = z;
        this._movementSpeed = 0.1;
        this._scene = scene;

        this._bullets = [];


        this._initialize();
    }

    _initialize() {
        this._enemy = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true }));
        this._enemy.position.set(this._enemyInitialX, 0, this._enemyInitialZ)
        this._scene.add(this._enemy);
    }

    updateEnemy() {

    }
}