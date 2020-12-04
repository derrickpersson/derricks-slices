import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingFilter';

const PizzasPage = ({ data, pageContext }) => {
  const pizzas = data.pizzas.nodes;
  //   console.log('Topping: ', topping);
  return (
    <>
      <ToppingsFilter activeTopping={pageContext.topping} />
      <PizzaList pizzas={pizzas} />
    </>
  );
};

export const query = graphql`
  query PizzaQuery($topping: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { eq: $topping } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

export default PizzasPage;
