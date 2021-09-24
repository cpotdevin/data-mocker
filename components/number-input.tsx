import React, { ChangeEvent } from 'react';

interface Props {
  value?: number | null;
  onChange?: (value: number | null) => void;
}

function NumberInput({ value = null, onChange = () => {} }: Props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const stringValue = event.target.value;
    if (stringValue === '') {
      onChange(null);
    }

    const newValue = parseInt(stringValue, 10);

    if (!Number.isNaN(newValue)) {
      if (newValue < 1) {
        onChange(1);
      } else {
        onChange(newValue);
      }
    }
  };

  return (
    <input
      className="outline-none focus:ring rounded-xl border font-mono p-4 duration-200 shadow-sm"
      type="text"
      value={value || ''}
      onChange={handleChange}
    />
  );
}

export default NumberInput;
