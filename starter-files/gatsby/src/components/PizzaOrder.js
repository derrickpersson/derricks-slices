import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import formatMoney from '../utils/formatMoney';
import calcPizzaPrice from '../utils/calcPizzaPrice';

const PizzaOrder = ({ order, pizzas, removeFromOrder }) => (
  <>
    {order.map((singleOrder, idx) => {
      const pizza = pizzas.find((za) => za.id === singleOrder.id);
      return (
        <MenuItemStyles>
          <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
          <h2>{pizza.name}</h2>
          <p>
            {formatMoney(calcPizzaPrice(pizza.price, singleOrder.size))}
            <button
              type="button"
              className="remove"
              onClick={() => removeFromOrder(idx)}
              title={`Remove ${singleOrder.size} ${pizza.name} from Order`}
            >
              &times;
            </button>
          </p>
        </MenuItemStyles>
      );
    })}
  </>
);

export default PizzaOrder;
