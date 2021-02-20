// DON'T DO ANYTHING IN HERE, THIS JUST PREPS US TO USE TS FOR ALL GATSBY GOODNESS. CHECKOUT THE .GATSBY DIRECTORY
const { generateConfig } = require('gatsby-plugin-ts-config');
module.exports = generateConfig({
  configDir: `.gatsby`,
  babel: false,
  tsNode: true,
});
