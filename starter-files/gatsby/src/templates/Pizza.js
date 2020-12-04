import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';

const SinglePizza = ({ data }) => {
  console.log('Data: ', data);
  return (
    <div>
      <Img fluid={data.pizza.image.asset.fluid} alt={data.pizza.name} />
      <h2>pizza.name</h2>
    </div>
  );
};

export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;

export default SinglePizza;
