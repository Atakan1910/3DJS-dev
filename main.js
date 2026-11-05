import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xc4cfdd);

const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
camera.position.z = 5.5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
document.body.appendChild(renderer.domElement);

const logo = new THREE.Group();
scene.add(logo);

// Silindiri öne çevirerek logoya kalınlık veriyoruz.
const base = new THREE.Mesh(
  new THREE.CylinderGeometry(1.5, 1.5, 0.22, 48),
  new THREE.MeshBasicMaterial({ color: 0x333943 })
);
base.rotation.x = Math.PI / 2;
logo.add(base);

const blackFace = new THREE.Mesh(
  new THREE.CircleGeometry(1.44, 48),
  new THREE.MeshBasicMaterial({ color: 0x111111 })
);
blackFace.position.z = 0.112;
logo.add(blackFace);

// Dört çeyrek daireyi sırayla mavi ve beyaz yapıyoruz.
const blue = new THREE.MeshBasicMaterial({ color: 0x1674cb });
const white = new THREE.MeshBasicMaterial({ color: 0xffffff });

for (let i = 0; i < 4; i++) {
  const quarter = new THREE.Mesh(
    new THREE.CircleGeometry(0.92, 16, i * Math.PI / 2, Math.PI / 2),
    i % 2 === 0 ? white : blue
  );
  quarter.position.z = 0.115;
  logo.add(quarter);
}

// Harfleri saydam bir tuvale çizip yüzeye ekliyoruz.
const label = document.createElement('canvas');
label.width = 256;
label.height = 256;
const pen = label.getContext('2d');
pen.fillStyle = '#ffffff';
pen.font = 'bold 36px Arial';
pen.textAlign = 'center';
pen.textBaseline = 'middle';
pen.fillText('B', 68, 47);
pen.fillText('M', 128, 28);
pen.fillText('W', 188, 47);

const letters = new THREE.Mesh(
  new THREE.PlaneGeometry(3, 3),
  new THREE.MeshBasicMaterial({
    map: new THREE.CanvasTexture(label),
    transparent: true
  })
);
letters.position.z = 0.12;
logo.add(letters);

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.position.z = Math.max(5.5, 3.2 / camera.aspect);
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', resize);
resize();

renderer.setAnimationLoop((time) => {
  logo.rotation.y = Math.sin(time / 1600) * 0.5;
  renderer.render(scene, camera);
});
