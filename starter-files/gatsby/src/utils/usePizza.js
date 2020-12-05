import { useState } from 'react';

const usePizza = ({ pizzas, inputs }) => {
  const [order, setOrder] = useState([]);
  const addToOrder = (orderedPizza) => {
    setOrder([...order, orderedPizza]);
  };

  const removeFromOrder = (index) => {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  };

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
};

export default usePizza;
