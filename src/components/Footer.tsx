import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import { FooterQuery } from '../../types/graphql-types';

const Footer: React.FunctionComponent = () => (
  <StaticQuery
    query={graphql`
      query Footer {
        site {
          siteMetadata {
            companyName
          }
        }
      }
    `}
    render={(data: FooterQuery) => (
      <footer>
        © {new Date().getFullYear()} {data.site.siteMetadata.companyName}
      </footer>
    )}
  />
);

export default Footer;
