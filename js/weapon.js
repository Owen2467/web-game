export function createAK(camera, scene) {
  const gun = new THREE.Group();

  const dark = new THREE.MeshStandardMaterial({ color: 0x222222 });
  const wood = new THREE.MeshStandardMaterial({ color: 0x5a3a1a });

  // Body
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.2, 1),
    dark
  );
  gun.add(body);

  // Barrel
  const barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 1.2),
    dark
  );
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(0, 0.05, -1.1);
  gun.add(barrel);

  // Stock
  const stock = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.25, 0.6),
    wood
  );
  stock.position.set(0, -0.05, 0.8);
  gun.add(stock);

  // Grip
  const grip = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 0.35, 0.15),
    wood
  );
  grip.position.set(0, -0.35, 0.2);
  gun.add(grip);

  // Magazine
  const mag = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.45, 0.25),
    dark
  );
  mag.position.set(0, -0.45, -0.1);
  mag.rotation.x = 0.2;
  gun.add(mag);

  gun.position.set(0.4, -0.4, -0.8);

  camera.add(gun);
  scene.add(camera);

  return gun;
}
