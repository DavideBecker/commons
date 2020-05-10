const fs = require("fs-extra");
const chalk = require("chalk");
const fetch = require("node-fetch");
const YAML = require("json-to-pretty-yaml");

const timeMapping = {
  "1 AM": 0,
  "2 AM": 1,
  "3 AM": 2,
  "4 AM": 3,
  "5 AM": 4,
  "6 AM": 5,
  "7 AM": 6,
  "8 AM": 7,
  "9 AM": 8,
  "10 AM": 9,
  "11 AM": 10,
  "12 AM": 11,

  "1 PM": 12,
  "2 PM": 13,
  "3 PM": 14,
  "4 PM": 15,
  "5 PM": 16,
  "6 PM": 17,
  "7 PM": 18,
  "8 PM": 19,
  "9 PM": 20,
  "10 PM": 21,
  "11 PM": 22,
  "12 PM": 23,
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports.fetch = async (url, handler = "text") => {
  await sleep(Math.random * 2000 + 1000);

  console.log("    request to", url, "sent");

  return await fetch(url).then((res) => res[handler]());
};

module.exports.camelize = (text) => {
  text = text.replace(/[^a-zA-Z_-]/g, " ");
  text = text.replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
  return text.substr(0, 1).toLowerCase() + text.substr(1);
};

async function _save(path, data, encoding = "utf-8") {
  await fs.outputFile(path, data, { encoding });
  console.log(chalk`    Saved file {cyan ${path}}`);
  return true;
}

module.exports.save = async (type, name, data) => {
  const types = {
    translations: {
      folder: "translations",
      filetype: "yaml",
      encoding: "utf-8",
      transformation: (v) => YAML.stringify(v),
    },
    json: {
      folder: "json",
      filetype: "json",
      encoding: "utf-8",
      transformation: (v) => JSON.stringify(v),
    },
    image: {
      folder: "img",
      filetype: false,
      encoding: "binary",
      transformation: (v) => v,
    },
  };

  const typeInfo = types[type];

  await _save(
    `./data/${typeInfo.folder}/${name}${
      typeInfo.filetype ? "." + typeInfo.filetype : ""
    }`,
    typeInfo.transformation(data),
    typeInfo.encoding
  );

  if (type == "json")
    await _save(
      `./data/${typeInfo.folder}/${name}_formatted.${typeInfo.filetype}`,
      JSON.stringify(data, null, 4),
      typeInfo.encoding
    );
};
