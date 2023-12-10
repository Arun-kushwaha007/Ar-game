async function fetchData() {
  let apiUrl = "http://localhost:3000/value"
  return fetch(apiUrl)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return JSON.parse(data).result
    })
    .catch(error => {
      console.error('Error fetching data:', error.message);
    });
}

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

export let controls = {};

window.addEventListener("keydown", (e) => {
  controls[e.key.toLowerCase()] = true;
});
window.addEventListener("keyup", (e) => {
  controls[e.key.toLowerCase()] = false;
});

let maxVelocity = 0.04;
let jawVelocity = 0;
let pitchVelocity = 0;
let planeSpeed = 0.006;
export let turbo = 0;

export async function updatePlaneAxis(x, y, z,  planePosition) {
  jawVelocity *= 0.95;
  pitchVelocity *= 0.95;

  if (Math.abs(jawVelocity) > maxVelocity) 
    jawVelocity = Math.sign(jawVelocity) * maxVelocity;

  if (Math.abs(pitchVelocity) > maxVelocity) 
    pitchVelocity = Math.sign(pitchVelocity) * maxVelocity;

  let myVariable = await fetchData()
  if (myVariable === "up") {
    pitchVelocity += 0.00125;
  }
  if (myVariable === "down") {
    pitchVelocity -= 0.0025;
  }
  console.log(myVariable)

  x.applyAxisAngle(z, jawVelocity);
  y.applyAxisAngle(z, jawVelocity);

  y.applyAxisAngle(x, pitchVelocity);
  z.applyAxisAngle(x, pitchVelocity);

  x.normalize();
  y.normalize();
  z.normalize();


  // plane position & velocity
  if (controls.shift) {
    turbo += 0.025;
  } else {
    turbo *= 0.95;
  }
  turbo = Math.min(Math.max(turbo, 0), 1);

  let turboSpeed = easeOutQuad(turbo) * 0.02;

  planePosition.add(z.clone().multiplyScalar(-planeSpeed -turboSpeed));
}