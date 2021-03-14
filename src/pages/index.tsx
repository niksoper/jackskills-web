import * as React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Shell from '../layout/shell';

import './index.scss';

const Index: React.FunctionComponent<{ data: any }> = ({ data }) => {
  return (
    <Shell siteKind="skills">
      <div className="fixed-width">
        <h1>My name is Jack Soper and I am wunderfol</h1>
        <Img
          imgStyle={{ height: 400, objectFit: 'contain' }}
          fluid={data.file.childImageSharp.fluid}
          alt="Handsome Jack Soper"
        />
      </div>
    </Shell>
  );
};

export const query = graphql`
  query MyQuery {
    file(relativePath: { eq: "daffodils.jpeg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default Index;
