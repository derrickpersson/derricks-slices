import calcPizzaPrice from './calcPizzaPrice';

const calcOrderTotal = (pizzas, order) =>
  order.reduce((acc, singleOrder) => {
    const pizza = pizzas.find((za) => za.id === singleOrder.id);

    return acc + calcPizzaPrice(pizza.price, singleOrder.size);
  }, 0);

export default calcOrderTotal;
