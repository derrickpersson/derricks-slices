import path from 'path';

const turnPizzasIntoPages = async ({ graphql, actions }) => {
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  data.pizzas.nodes.forEach((za) => {
    actions.createPage({
      path: `pizza/${za.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: za.slug.current,
      },
    });
  });
};

export const createPages = async (params) => {
  await turnPizzasIntoPages(params);
};
