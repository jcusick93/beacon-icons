const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const distDir = "./dist/icons/react/";
const srcDir = "./src/icons/svg/";

// Function to get all SVG files in the directory
function getSvgFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".svg");
}

// Function to get all React component filenames in the directory
function getReactFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter((file) => path.extname(file) === ".js" && file !== "index.js");
}
// Function to convert SVG file name to React component name
function convertToReactName(fileName) {
  return fileName
    .replace(/\.(svg|js)$/, "") // Remove .svg or .js extension
    .split(/[-_]/) // Split by hyphens and underscores
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1)) // Capitalize each part
    .join(""); // Join parts back together
}

// Function to get existing React icons
function getExistingReactIcons() {
  return getReactFiles(distDir).map((file) => {
    return convertToReactName(file);
  });
}

// Function to clean up dist directory
function cleanupDistIcons() {
  const distFiles = getExistingReactIcons();
  const srcFiles = getSvgFiles(srcDir).map((file) => convertToReactName(file));

  console.log("SVG Icons in src:", srcFiles);
  console.log("Existing React Icons:", distFiles);

  distFiles.forEach((icon) => {
    if (!srcFiles.includes(icon)) {
      fs.unlinkSync(path.join(distDir, `${icon}.js`)); // Remove the corresponding .js file
      console.log(`💀 Removed: ${icon}.js`);
    }
  });
}

// Function to convert SVG files to React components using SVGR
function convertSvgs() {
  execSync(`npx @svgr/cli --out-dir ${distDir} ${srcDir}`, {
    stdio: "inherit",
  });
  console.log("All SVGs converted to React components.");
}

// Clean up dist directory first
cleanupDistIcons();

// Then convert the SVG files
convertSvgs();
