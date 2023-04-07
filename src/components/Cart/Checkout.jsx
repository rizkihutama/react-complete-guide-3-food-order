import classes from './Checkout.module.css';
import useMultipleInputs from '../../hooks/use-multiple-input';

const Checkout = (props) => {
  const defaultInputValues = {
    name: '',
    email: '',
    phone: '',
    address: '',
  };

  const defaultInputKeystrokes = {
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
    inputKeystrokes: inputKeystrokes,
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
        ...inputValues,
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
        ...inputValues,
        name: !nameIsInvalid && nameIsTouched,
        email: !emailIsInvalid && emailIsTouched,
        phone: !phoneIsInvalid && phoneIsTouched,
        address: !addressIsInvalid && addressIsTouched,
      });
    }
  );

  const formSubmitHandler = (e) => {
    e.preventDefault();
  };

  const validateInputPhoneNumber = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={classes['form-control']}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          id='name'
          // onInput={}
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
          value={inputValues.name}
        />
      </div>
      <div className={classes['form-control']}>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' />
      </div>
      <div className={classes['form-control']}>
        <label htmlFor='phone'>Phone</label>
        <input type='tel' name='phone' id='phone' maxLength='13' />
      </div>
      <div className={classes['form-control']}>
        <label htmlFor='address'>Address</label>
        <textarea name='address' id='address' cols='30' rows='10'></textarea>
      </div>
      <button type='button' onClick={props.onClose}>
        Cancel
      </button>
      <button type='submit'>Confirm</button>
    </form>
  );
};

export default Checkout;
