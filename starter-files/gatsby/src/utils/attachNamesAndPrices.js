import calcPizzaPrice from './calcPizzaPrice';
import formatMoney from './formatMoney';

const attachNamesAndPrices = (order, pizzas) =>
  order.map((item) => {
    const pizza = pizzas.find((za) => za.id === item.id);
    return {
      id: pizza.id,
      name: pizza.name,
      size: item.size,
      price: formatMoney(calcPizzaPrice(pizza.price, item.size)),
      thumbnail: pizza.image.asset.fluid.src,
    };
  });
export default attachNamesAndPrices;
