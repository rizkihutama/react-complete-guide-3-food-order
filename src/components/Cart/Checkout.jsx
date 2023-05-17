import classes from './Checkout.module.css';
import useMultipleInputs from '../../hooks/use-multiple-input';

const Checkout = (props) => {
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

      const {
        name: nameIsInvalid,
        email: emailIsInvalid,
        phone: phoneIsInvalid,
        address: addressIsInvalid,
      } = isInputInvalid;

      setIsInputInvalid({
        ...isInputInvalid,
        name: !nameIsInvalid && nameIsTouched,
        email: !emailIsInvalid && emailIsTouched,
        phone: !phoneIsInvalid && phoneIsTouched,
        address: !addressIsInvalid && addressIsTouched,
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

    console.log(isInputValid.name);

    if (!isFormValid) return;

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
        <button type='submit' className={classes.button}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
