import { Eleventy } from "@11ty/eleventy";
import config from "./config.json" with { type: "json" };

const inputDirectory = config.source;
const __dirname = import.meta.dirname;
const distDirectory = __dirname;

console.info("Dist folder:", distDirectory);

await generateWebsite(inputDirectory, distDirectory);

async function generateWebsite(inputDirectory, distDirectory) {
  const eleventy = new Eleventy(inputDirectory, distDirectory, {
    config: function (eleventyConfig) {
      eleventyConfig.setTemplateFormats("md");
      
      eleventyConfig.addPassthroughCopy(inputDirectory, {
        filter: ["**/*.png", "**/*.pdf", "**/*.mp4"],
      })
    },
  });
  await eleventy.write();
}
