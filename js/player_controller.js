
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

export class Player {
    constructor(scene, camera, ground) {

        // Vars init
        this._keys = { up: false, down: false, left: false, right: false };
        this._playerVelocity = { x: 0, y: 0, z: 0 };
        this._movementSpeed = 0.1;
        this._bulletSpeed = 8;
        this._bulletMaxDistance = 10;
        this._scene = scene;
        this._camera = camera;
        this._ground = ground;

        this._raycaster = new THREE.Raycaster();

        this._bullets = [];

        this.clock = new THREE.Clock();
        this.delta = 0;


        this._initialize();
    }

    _initialize() {

        this._player = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ color: 0xe6e6e6 }));
        this._scene.add(this._player);

        // Initialize key listteners
        document.addEventListener('keydown', (e) => this._OnKeyDown(e), false);
        document.addEventListener('keyup', (e) => this._OnKeyUp(e), false);
        document.addEventListener('click', (e) => this._OnClick(e), false);
    }

    _OnKeyDown(event) {
        switch (event.keyCode) {
            case 38: // up
            case 87: // w
                this._keys.up = true;
                break;
            case 37: // left
            case 65: // a
                this._keys.left = true;
                break;
            case 40: // down
            case 83: // s
                this._keys.down = true;
                break;
            case 39: // right
            case 68: // d
                this._keys.right = true;
                break;
            case 32: // space
            case 13: // enter
                break;
        }
    }

    _OnKeyUp(event) {
        switch (event.keyCode) {
            case 38: // up
            case 87: // w
                this._keys.up = false;
                break;
            case 37: // left
            case 65: // a
                this._keys.left = false;
                break;
            case 40: // down
            case 83: // s
                this._keys.down = false;
                break;
            case 39: // right
            case 68: // d
                this._keys.right = false;
                break;
            case 32: // space
            case 13: // enter
                this._shootBullet();
                break;
        }
    }

    _OnClick(event) {
        var mouse = new THREE.Vector2();
        mouse.x = ((event.clientX / window.innerWidth) * 2 - 1);
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        this._raycaster.setFromCamera(mouse, this._camera);
        var intersects = this._raycaster.intersectObjects([this._ground]);
        if (intersects.length == 0) {
            return;
        } else {
            this._shootBullet(intersects[0].point);
        }
    }

    _shootBullet(target) {

        let dir = new THREE.Vector3(target.x, target.y, target.z);
        dir.sub(this._player.position);
        dir.y = 0;
        dir.normalize();

        let max = new THREE.Vector3(this._player.position.x, this._player.position.y, this._player.position.z);
        max.addScaledVector(dir, this._bulletMaxDistance);

        let bullet = new THREE.Mesh();
        bullet.material = new THREE.MeshToonMaterial({ color: "#00ff00" });
        bullet.geometry = new THREE.SphereGeometry(0.2);
        bullet.position.copy(this._player.position);
        bullet.userData.direction = dir;
        bullet.userData.speed = this._bulletSpeed;
        bullet.userData.maxVector = max;
        bullet.userData.maxDistance = max.distanceTo(this._player.position);
        this._bullets.push(bullet);
        this._scene.add(bullet);
    }

    _updateBullets() {
        this.delta = this.clock.getDelta();
        this._bullets.forEach(bullet => {
            bullet.position.addScaledVector(bullet.userData.direction, bullet.userData.speed * this.delta);
            // bullet.position.add(bullet.userData.direction);
            let bulletDistance = bullet.position.distanceTo(this._player.position);
            if (bulletDistance > bullet.userData.maxDistance) {
                this._scene.remove(bullet);
            }
            // let maxDistance = bullet.userData.max.distanceTo(this._player.position);
            // console.log(bulletDistance, maxDistance);
            // console.log(this.delta   )
            // console.log(bullet.position.distanceTo(bullet.userData.max));
            //if (bullet.position.y <= plane.position.y) bullet.userData.speed = 0; // stop, when we reached the plane
          });


    }

    updatePlayer() {
        this._playerVelocity.x = (this._keys.right ? this._movementSpeed : 0) - (this._keys.left ? this._movementSpeed : 0);
        this._playerVelocity.z = (this._keys.down ? this._movementSpeed : 0) - (this._keys.up ? this._movementSpeed : 0);

        this._movePlayer(this._playerVelocity.x, this._playerVelocity.y, this._playerVelocity.z);
        this._updateBullets();
    }

    /**
     * Player and camera movement
     * @param {number} x Axis speed
     * @param {number} y Axis speed
     * @param {number} z Axis speed
     */
    _movePlayer(x, y, z) {
        this._camera.position.x += x;
        this._camera.position.y += y;
        this._camera.position.z += z;
        this._player.position.x += x;
        this._player.position.y += y;
        this._player.position.z += z;
    }
}