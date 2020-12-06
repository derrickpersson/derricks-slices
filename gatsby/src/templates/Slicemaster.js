import React from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';

const SlicemasterPage = ({ data, pageContext: { slicemaster } }) => (
  <>
    <SEO title={slicemaster.name} />
    <div className="center">
      <Img fluid={data.slicemaster.image.asset.fluid} alt={slicemaster.name} />
      <h2>
        <span className="mark">{slicemaster.name}</span>
      </h2>
      <p>{data.slicemaster.description}</p>
    </div>
  </>
);

export const query = graphql`
  query($slicemasterId: String) {
    slicemaster: sanityPerson(id: { eq: $slicemasterId }) {
      name
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;

export default SlicemasterPage;
