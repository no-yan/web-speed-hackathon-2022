import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

const IMAGE_DIR = `./public/assets/images`;
const OUT_DIR = `./public/optimizedAssets/images`;

(async () => {
  console.log("Compressing...");
  await imagemin([`${IMAGE_DIR}/players/*.jpg`], {
    destination: `${OUT_DIR}/players`,
    plugins: [
      imageminWebp({ quality: 50, resize: { height: 100, width: 100 } }),
    ],
  });
  await imagemin([`${IMAGE_DIR}/races/*.jpg`], {
    destination: `${OUT_DIR}/races`,
    plugins: [
      imageminWebp({ quality: 50, resize: { height: 225, width: 400 } }),
    ],
  });
  console.log("Images optimized");
})();
