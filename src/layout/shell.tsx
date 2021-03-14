import * as React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';

import Footer from '../components/Footer';
import { HeaderQuery } from '../../types/graphql-types';

import './shell.scss';

export interface IShellProps {
  siteKind: 'kills' | 'skills';
}

const Shell: React.FunctionComponent<IShellProps> = ({ children, siteKind }) => {
  return (
    <StaticQuery
      query={graphql`
        query Header {
          site {
            siteMetadata {
              skillsSiteName
              killSiteName
            }
          }
        }
      `}
      render={(data: HeaderQuery) => {
        const { skillsSiteName, killSiteName } = data.site.siteMetadata;

        const siteName = React.useMemo(() => (siteKind === 'kills' ? killSiteName : skillsSiteName), [
          siteKind,
          skillsSiteName,
          killSiteName,
        ]);
        const linkTarget = React.useMemo(() => (siteKind === 'kills' ? '/' : '/kills'), [siteKind]);

        return (
          <div className={`main-wrapper ${siteKind}`}>
            <Helmet defaultTitle={siteName} titleTemplate={`%s — ${siteName}`} />
            <header>
              <div className="fixed-width">
                <Link to={linkTarget}>{siteName}</Link>
              </div>
            </header>
            <main>{children}</main>
            <Footer />
          </div>
        );
      }}
    />
  );
};

export default Shell;
