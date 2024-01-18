const IMAGES_COUNT = 64;

function main() {
  const canvas = document.querySelector("canvas")!;
  const context = canvas.getContext("2d")!;
  context.imageSmoothingEnabled = false;

  canvas.width = 2560;
  canvas.height = 1440;

  let images: HTMLImageElement[] = [];

  for (let i = 0; i < IMAGES_COUNT; i++) {
    images[i] = new Image();
    images[i].src = `images/${i}.png`;
  }

  let index = 0;

  requestAnimationFrame(function draw() {
    requestAnimationFrame(draw);

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[index], 0, 0, 2560, 1440, 0, 0, canvas.width, canvas.height);
  });

  let initialMouse = 0;
  let initialIndex = 0;

  document.addEventListener("pointerdown", (e) => {
    initialMouse = e.clientX;
    initialIndex = index;
  });

  document.addEventListener("pointermove", (e) => {
    if (e.buttons === 1) {
      const changeMouse = e.clientX - initialMouse;

      const indexChange = Math.floor(initialIndex + changeMouse / 50);
      index = ((indexChange % IMAGES_COUNT) + IMAGES_COUNT) % IMAGES_COUNT;
    }
  });
}

main();
