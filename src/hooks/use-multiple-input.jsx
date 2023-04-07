import { useEffect, useState } from 'react';

const useMultipleInput = (
  defaultInputValues,
  defaultInputKeystrokes,
  defaultTouchedValues,
  defaultInputIsValid,
  defaultInputIsInvalid,
  validateInputs
) => {
  const [inputValues, setInputValues] = useState(defaultInputValues);
  const [inputKeystrokes, setInputKeystrokes] = useState(
    defaultInputKeystrokes
  );
  const [isInputTouched, setIsInputTouched] = useState(defaultTouchedValues);
  const [isInputValid, setIsInputValid] = useState(defaultInputIsValid);
  const [isInputInvalid, setIsInputInvalid] = useState(defaultInputIsInvalid);

  useEffect(() => {
    validateInputs();
  }, [inputValues, isInputTouched]);

  const inputTypeHandler = (event) => {
    const { name, value } = event.target;
    setInputKeystrokes({ ...inputValues, [name]: value });
  };

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
    setInputKeystrokes(defaultInputKeystrokes);
    setIsInputTouched(defaultTouchedValues);
    setIsInputValid(defaultInputIsValid);
    setIsInputInvalid(defaultInputIsInvalid);
  };

  return {
    inputValues,
    inputKeystrokes,
    isInputTouched,
    isInputValid,
    setIsInputValid,
    isInputInvalid,
    setIsInputInvalid,
    inputTypeHandler,
    inputChangeHandler,
    inputBlurHandler,
    resetAllInputState,
  };
};

export default useMultipleInput;
