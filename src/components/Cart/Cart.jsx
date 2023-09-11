import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isDidSubmit, setIsDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const onOrderHandler = () => {
    setIsCheckout(true);
  };

  const removeCartItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const addCartItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const onConfirmHandler = async (userData) => {
    setIsSubmit(true);

    const res = await fetch(
      'https://react-http-d08ab-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx,
        }),
      }
    );

    if (!res.ok) {
      return alert('Something went wrong!');
    }

    setIsSubmit(false);
    setIsDidSubmit(true);
    cartCtx.clearItem();
  };

  const cartItems = (
    <>
      <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={removeCartItemHandler.bind(null, item.id)}
            onAdd={addCartItemHandler.bind(null, item)}
          />
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total</span>
        <span>{totalAmount}</span>
      </div>
    </>
  );

  const modalAction = (
    <>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={onOrderHandler}>
            Order
          </button>
        )}
      </div>
    </>
  );

  const modalContent = (
    <>
      {cartItems}
      {isCheckout && (
        <Checkout onClose={props.onClose} onConfirm={onConfirmHandler} />
      )}
      {!isCheckout && modalAction}
    </>
  );

  return (
    <Modal onBackGroundClick={props.onClose}>
      {isSubmit && isDidSubmit && <p>Loading...</p>}
      {!isSubmit && !isDidSubmit && modalContent}
      {!isSubmit && isDidSubmit && (
        <>
          <p>Successfuly Order</p>
          <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>
              Close
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default Cart;
