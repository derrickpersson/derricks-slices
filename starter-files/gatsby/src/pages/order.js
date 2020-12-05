import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calcPizzaPrice from '../utils/calcPizzaPrice';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import usePizza from '../utils/usePizza';
import PizzaOrder from '../components/PizzaOrder';
import calcOrderTotal from '../utils/calcOrderTotal';

const OrderPage = ({ data }) => {
  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });
  const { order, addToOrder, removeFromOrder } = usePizza({
    pizzas: data.pizzas.nodes,
    inputs: values,
  });

  return (
    <div>
      <SEO title="Order a Pizza!" />
      <OrderStyles>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">
            Name
            <input
              id="name"
              type="text"
              name="name"
              value={values.name}
              onChange={updateValue}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              id="email"
              type="email"
              name="email"
              value={values.email}
              onChange={updateValue}
            />
          </label>
        </fieldset>
        <fieldset className="menu">
          <legend>Menu</legend>
          {data.pizzas.nodes.map((za) => (
            <MenuItemStyles key={za.id}>
              <Img
                width="50"
                height="50"
                fluid={za.image.asset.fluid}
                alt={za.name}
              />
              <div>
                <h2>{za.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button
                    type="button"
                    onClick={() =>
                      addToOrder({
                        id: za.id,
                        size,
                      })
                    }
                  >
                    {size} {formatMoney(calcPizzaPrice(za.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
          <PizzaOrder
            pizzas={data.pizzas.nodes}
            removeFromOrder={removeFromOrder}
            order={order}
          />
        </fieldset>
        <fieldset>
          <h3>
            Your order total is:{' '}
            {formatMoney(calcOrderTotal(data.pizzas.nodes, order))}
          </h3>
        </fieldset>
      </OrderStyles>
    </div>
  );
};

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        id
        name
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
        price
      }
    }
  }
`;

export default OrderPage;
