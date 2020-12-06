import { graphql } from 'gatsby';
import React, { useContext } from 'react';
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
    mapleSyrup: '',
  });
  const {
    order,
    addToOrder,
    removeFromOrder,
    loading,
    error,
    message,
    submitOrder,
  } = usePizza({
    pizzas: data.pizzas.nodes,
    values,
  });

  if (message) {
    return <p>{message}</p>;
  }

  return (
    <div>
      <SEO title="Order a Pizza!" />
      <OrderStyles onSubmit={submitOrder}>
        <fieldset disabled={loading}>
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

          <input
            id="mapleSyrup"
            type="mapleSyrup"
            name="mapleSyrup"
            value={values.mapleSyrup}
            onChange={updateValue}
            className="mapleSyrup"
          />
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
                    key={`${za.id}-${size}`}
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
        <fieldset className="order" disabled={loading}>
          <legend>Order</legend>
          <PizzaOrder
            pizzas={data.pizzas.nodes}
            removeFromOrder={removeFromOrder}
            order={order}
          />
        </fieldset>
        <fieldset disabled={loading}>
          <h3>
            Your order total is:{' '}
            {formatMoney(calcOrderTotal(data.pizzas.nodes, order))}
          </h3>
          <div>{error ? <p>Error: {error}</p> : null}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing Order...' : 'Order Ahead'}
          </button>
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
