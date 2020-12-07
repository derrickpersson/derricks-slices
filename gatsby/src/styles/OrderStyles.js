import styled from 'styled-components';

const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  fieldset {
    /* made 2 columns, each goes 100% wide */
    grid-column: span 2;
    max-height: 600px;
    overflow: auto;
    display: grid;
    gap: 1rem;
    align-content: start;
    label {
      display: grid;
      gap: 1rem;
      align-content: start;
    }
    label + label {
      margin-top: 1rem;
    }
    /* If it's order or menu, only span a single column */
    &.order,
    &.menu {
      grid-column: span 1;
      height: 600px;
    }
  }
  .mapleSyrup {
    display: none;
  }
  @media (max-width: 900px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }
  }
`;

export default OrderStyles;
