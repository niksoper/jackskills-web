import * as React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';

import Footer from '../components/Footer';
import { HeaderQuery } from '../../types/graphql-types';

import './shell.scss';

const Shell: React.FunctionComponent = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query Header {
          site {
            siteMetadata {
              siteName
            }
          }
        }
      `}
      render={(data: HeaderQuery) => {
        const { siteName } = data.site.siteMetadata;
        return (
          <>
            <Helmet defaultTitle={siteName} titleTemplate={`%s — ${siteName}`} />
            <header>
              <div className="fixed-width">
                <Link to="/">{siteName}</Link>
              </div>
            </header>
            <main>{children}</main>
            <Footer />
          </>
        );
      }}
    />
  );
};

export default Shell;
