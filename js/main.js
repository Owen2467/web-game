import { createAK } from "./weapon.js";

/* ---------------- SCENE ---------------- */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* ---------------- LIGHTING ---------------- */
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

/* ---------------- FLOOR ---------------- */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.MeshStandardMaterial({ color: 0x444444 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

/* ---------------- PLAYER ---------------- */
camera.position.set(0, 1.6, 5);

/* ---------------- AK ---------------- */
const gun = createAK(camera, scene);

/* ---------------- SHOOTING ---------------- */
let bullets = [];

window.addEventListener("click", () => {
  const bullet = new THREE.Mesh(
    new THREE.SphereGeometry(0.03),
    new THREE.MeshBasicMaterial({ color: 0xffff00 })
  );

  bullet.position.copy(camera.position);
  bullet.velocity = new THREE.Vector3(0, 0, -1)
    .applyQuaternion(camera.quaternion)
    .multiplyScalar(0.6);

  scene.add(bullet);
  bullets.push(bullet);

  gun.position.z = -0.75; // recoil
});

/* ---------------- MOUSE LOOK ---------------- */
let pitch = 0, yaw = 0;

document.body.requestPointerLock =
  document.body.requestPointerLock ||
  document.body.mozRequestPointerLock;

document.body.onclick = () => document.body.requestPointerLock();

document.addEventListener("mousemove", (e) => {
  yaw -= e.movementX * 0.002;
  pitch -= e.movementY * 0.002;
  pitch = Math.max(-Math.PI/2, Math.min(Math.PI/2, pitch));
  camera.rotation.set(pitch, yaw, 0);
});

/* ---------------- LOOP ---------------- */
function animate() {
  requestAnimationFrame(animate);

  bullets.forEach((b, i) => {
    b.position.add(b.velocity);
    if (b.position.length() > 200) {
      scene.remove(b);
      bullets.splice(i, 1);
    }
  });

  gun.position.z += (-0.8 - gun.position.z) * 0.2;

  renderer.render(scene, camera);
}
animate();

/* ---------------- RESIZE ---------------- */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
