import { Eleventy } from "@11ty/eleventy";
import config from "./config.json" with { type: "json" };
import mila from "markdown-it-link-attributes";

const inputDirectory = config.source;
const __dirname = import.meta.dirname;
const distDirectory = __dirname;

console.info("Dist folder:", distDirectory);

await generateWebsite(inputDirectory, distDirectory);

async function generateWebsite(inputDirectory, distDirectory) {
  const eleventy = new Eleventy(inputDirectory, distDirectory, {
    config: function (eleventyConfig) {
      // Use markdown
      eleventyConfig.setTemplateFormats("md");
      
      // Copy assets
      eleventyConfig.addPassthroughCopy(inputDirectory, {
        filter: ["**/*.png", "**/*.pdf", "**/*.mp4"],
      })

      // Make the external links open in a new tab
      // see https://dannywhite.net/notes/new-tab-links/
      const milaOptions = {
        matcher(href) {
          return href.match(/^https?:\/\//);
        },
        attrs: {
          target: "_blank",
          rel: "noopener",
        },
      };
      eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(mila, milaOptions));
    },
  });
  await eleventy.write();
}
