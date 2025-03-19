import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';

// 子组件
type FormInputRef = {
  focus: () => void;
  validate: () => boolean;
};

const FormInput = forwardRef<FormInputRef>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const focus = () => {
    inputRef.current?.focus();
  };

  const validate = () => {
    const isValid = inputRef.current?.value.trim() !== '';
    setError(isValid ? '' : 'Field is required');
    return isValid;
  };

  useImperativeHandle(ref, () => ({ focus, validate }));

  return (
    <div>
      <input ref={inputRef} />
      {error && <div className="error">{error}</div>}
    </div>
  );
});

// 父组件
const Form = () => {
  const inputRef = useRef<FormInputRef>(null);

  const handleSubmit = () => {
    if (inputRef.current?.validate()) {
      // 提交逻辑
    }
  };

  return (
    <div>
      <FormInput ref={inputRef} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Form;