import path from "path";
import fs from "fs";

export const filePath = path.join(__dirname, "../public/robots.txt");

export const generateRobotsTxt = (isOnProduction: boolean) => {
  const robotsDev = ["User-agent: *", "Disallow: /"].join("\n");
  const robotsProd = [
    "User-agent: *",
    "Disallow: /assets/",
    "Disallow: /images/",
    "",
    `Sitemap: https://code.travail.gouv.fr/sitemap.xml`,
  ].join("\n");

  const robot = isOnProduction ? robotsProd : robotsDev;

  fs.writeFileSync(filePath, robot);
};

const run = () => {
  generateRobotsTxt(
    process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT ? true : false
  );
  console.log("Robots.txt generated.");
};

run();
