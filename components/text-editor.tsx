import React, { ChangeEvent } from 'react';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

function TextEditor({ value = '', onChange = () => {} }: Props) {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <textarea
      className="outline-none focus:ring rounded-xl border w-full font-mono p-4 mb-4 duration-200 shadow-sm"
      rows={16}
      value={value}
      onChange={handleChange}
    />
  );
}

export default TextEditor;
