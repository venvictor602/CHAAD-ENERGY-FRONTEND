/**
 * Uploads all images from public/assets/CHAAD_ENERGY to Cloudinary.
 * Loads CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET from .env.local.
 *
 * Run from project root: node scripts/upload-to-cloudinary.js
 *
 * Outputs: src/lib/cloudinary-assets.json (array of { url, publicId, filename }).
 * Deletes each file from public/assets/CHAAD_ENERGY after a successful upload.
 */

const IMAGE_EXT = /\.(jpg|jpeg|png|gif|webp|heic|heif)$/i;
const FOLDER = "chaad-energy";

async function main() {
  const { default: dotenv } = await import("dotenv");
  dotenv.config({ path: ".env.local" });

  const path = (await import("node:path")).default;
  const fs = (await import("node:fs")).default;
  const { v2: cloudinary } = await import("cloudinary");

  const ASSETS_DIR = path.join(
    __dirname,
    "..",
    "public",
    "assets",
    "CHAAD_ENERGY",
  );
  const OUTPUT_FILE = path.join(
    __dirname,
    "..",
    "src",
    "lib",
    "cloudinary-assets.json",
  );

  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    console.error(
      "Missing Cloudinary env. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env.local",
    );
    process.exit(1);
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

  if (!fs.existsSync(ASSETS_DIR)) {
    console.error("Assets directory not found:", ASSETS_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(ASSETS_DIR).filter((f) => IMAGE_EXT.test(f));
  console.log(`Found ${files.length} images in ${ASSETS_DIR}`);

  const results = [];
  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const filePath = path.join(ASSETS_DIR, filename);
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: FOLDER,
        use_filename: true,
        unique_filename: true,
      });
      results.push({
        url: result.secure_url,
        publicId: result.public_id,
        filename,
        index: i,
      });
      fs.unlinkSync(filePath);
      console.log(
        `[${i + 1}/${files.length}] ${filename} -> ${result.secure_url} (deleted locally)`,
      );
    } catch (err) {
      console.error(`Failed to upload ${filename}:`, err.message);
    }
  }

  const outDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2), "utf8");
  console.log(`\nWrote ${results.length} URLs to ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
