import { useEffect, useState } from 'react';

const useMultipleInput = (
  defaultInputValues,
  defaultTouchedValues,
  defaultInputIsValid,
  defaultInputIsInvalid,
  validateInputs
) => {
  const [inputValues, setInputValues] = useState(defaultInputValues);
  const [isInputTouched, setIsInputTouched] = useState(defaultTouchedValues);
  const [isInputValid, setIsInputValid] = useState(defaultInputIsValid);
  const [isInputInvalid, setIsInputInvalid] = useState(defaultInputIsInvalid);

  useEffect(() => {
    validateInputs();
  }, [inputValues, isInputTouched]);

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const inputBlurHandler = (event) => {
    const { name } = event.target;
    setIsInputTouched({ ...isInputTouched, [name]: true });
  };

  const resetAllInputState = () => {
    setInputValues(defaultInputValues);
    setIsInputTouched(defaultTouchedValues);
    setIsInputValid(defaultInputIsValid);
    setIsInputInvalid(defaultInputIsInvalid);
  };

  return {
    inputValues,
    isInputTouched,
    isInputValid,
    setIsInputValid,
    isInputInvalid,
    setIsInputInvalid,
    inputChangeHandler,
    inputBlurHandler,
    resetAllInputState,
  };
};

export default useMultipleInput;
