import * as dotenv from 'dotenv';
import { GatsbyConfig } from 'gatsby';
import { resolve } from 'path';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const rootPath = (filePath: string) => resolve(__dirname, '..', filePath);

const config: GatsbyConfig = {
  siteMetadata: {
    skillsSiteName: `JackSkills`,
    killSiteName: `JacksKills`,
    siteUrl: `https://jackskills.com`,
    companyName: `Jack Soper`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-ts`,
      options: {
        codegen: true,
        // Don't move this inside src/, it'll cause a circular callback
        fileName: `types/graphql-types.ts`,
        documentPaths: ['src/**/*.tsx'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: rootPath('src/pages'),
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [],
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
  ],
};

export default config;
