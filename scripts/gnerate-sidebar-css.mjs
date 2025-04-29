import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sidebarDir = path.resolve(__dirname, "../static/img/sidebar");
const supportedExtensions = [".svg", ".png", ".jpg", ".jpeg", ".gif"];

const files = fs.readdirSync(sidebarDir).filter(file => {
  return supportedExtensions.includes(path.extname(file).toLowerCase());
});

const output = [];

for (const file of files) {
  const style = path.basename(file, path.extname(file));
  const className = "style_" + style.replace(/\//g, "_");
  const iconPath = `../../static/img/sidebar/${file}`;

  output.push(`
.${className} .menu__link {
  position: relative;
  padding-left: 2em;
}
.${className} .menu__link::before {
  content: "";
  position: absolute;
  top: 50%;
  left: var(--ifm-menu-link-padding-vertical);
  transform: translateY(-50%);
  width: 1em;
  height: 1em;
  background-image: url("${iconPath}");
  background-size: contain;
  background-repeat: no-repeat;
}
`);
}

const cssOutputPath = path.join("./src/css/sidebar-style.css");
fs.writeFileSync(cssOutputPath, output.join("\n"));
console.log("✅ generated sidebar-style.css!");