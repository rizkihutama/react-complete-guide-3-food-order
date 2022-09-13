import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {
  const [isAmountValid, setIsAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = event => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;

    // convert entered amount from string to number
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      setIsAmountIsValid(false);

      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        input={{
          type: 'number',
          id: `meal_${props.id}`,
          name: 'amount',
          min: 1,
          max: 5,
          defaultValue: 1,
          ref: amountInputRef,
        }}
      />
      <button>+ Add</button>
      {!isAmountValid && <small>Please enter a valid amount (1-5)!</small>}
    </form>
  );
};

export default MealItemForm;
