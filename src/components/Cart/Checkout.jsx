import { useContext } from 'react';
import classes from './Checkout.module.css';
import useMultipleInputs from '../../hooks/use-multiple-input';
import CartContext from '../../store/cart-context';

const Checkout = (props) => {
  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;

  const defaultInputValues = {
    name: '',
    email: '',
    phone: '',
    address: '',
  };

  const defaultTouchedValues = {
    name: false,
    email: false,
    phone: false,
    address: false,
  };

  const defaultInputIsValid = {
    name: false,
    email: false,
    phone: false,
    address: false,
  };

  const defaultInputIsInvalid = {
    name: false,
    email: false,
    phone: false,
    address: false,
  };

  const {
    inputValues: inputValues,
    isInputTouched: isInputTouched,
    isInputValid: isInputValid,
    setIsInputValid,
    isInputInvalid: isInputInvalid,
    setIsInputInvalid,
    inputChangeHandler,
    inputBlurHandler,
    resetAllInputState,
  } = useMultipleInputs(
    defaultInputValues,
    defaultTouchedValues,
    defaultInputIsValid,
    defaultInputIsInvalid,
    () => {
      const {
        name: nameInputValue,
        email: emailInputValue,
        phone: phoneInputValue,
        address: addressInputValue,
      } = inputValues;

      const {
        name: nameIsTouched,
        email: emailIsTouched,
        phone: phoneIsTouched,
        address: addressIsTouched,
      } = isInputTouched;

      const {
        name: nameIsValid,
        email: emailIsValid,
        phone: phoneIsValid,
        address: addressIsValid,
      } = isInputValid;

      setIsInputValid({
        ...isInputValid,
        name: nameInputValue.trim() !== '',
        email:
          emailInputValue.trim() !== '' &&
          (emailInputValue.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) == null
            ? false
            : true),
        phone:
          phoneInputValue.trim() !== '' &&
          (phoneInputValue.match(/^\d+$/) == null ? false : true),
        address: addressInputValue.trim() !== '',
      });

      setIsInputInvalid({
        ...isInputInvalid,
        name: !nameIsValid || (!nameIsValid && nameIsTouched),
        email: !emailIsValid || (!emailIsValid && emailIsTouched),
        phone: !phoneIsValid || (!phoneIsValid && phoneIsTouched),
        address: !addressIsValid || (!addressIsValid && addressIsTouched),
      });
    }
  );

  let isFormValid =
    isInputValid.name &&
    isInputValid.email &&
    isInputValid.phone &&
    isInputValid.email;

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    props.onConfirm(inputValues);

    resetAllInputState();
  };

  const inputNameClasses = isInputInvalid.name
    ? `${classes['form-control']} ${classes.invalid}`
    : classes['form-control'];

  const inputEmailClasses = isInputInvalid.email
    ? `${classes['form-control']} ${classes.invalid}`
    : classes['form-control'];

  const inputPhoneClasses = isInputInvalid.phone
    ? `${classes['form-control']} ${classes.invalid}`
    : classes['form-control'];

  const inputAddressClasses = isInputInvalid.address
    ? `${classes['form-control']} ${classes.invalid}`
    : classes['form-control'];

  return (
    <form onSubmit={formSubmitHandler} className={classes['form-checkout']}>
      <div className={inputNameClasses}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          id='name'
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
          value={inputValues.name}
        />
      </div>
      <div className={inputEmailClasses}>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
          value={inputValues.email}
        />
      </div>
      <div className={inputPhoneClasses}>
        <label htmlFor='phone'>Phone</label>
        <input
          type='tel'
          name='phone'
          id='phone'
          maxLength='13'
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
          value={inputValues.phone}
        />
      </div>
      <div className={inputAddressClasses}>
        <label htmlFor='address'>Address</label>
        <textarea
          name='address'
          id='address'
          cols='30'
          rows='10'
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
          value={inputValues.address}
        ></textarea>
      </div>
      <div className={classes.actions}>
        <button
          type='button'
          className={classes['button--alt']}
          onClick={props.onClose}
        >
          Cancel
        </button>
        {hasItems && (
          <button type='submit' className={classes.button}>
            Confirm
          </button>
        )}
      </div>
    </form>
  );
};

export default Checkout;
