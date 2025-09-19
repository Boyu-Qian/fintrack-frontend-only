import React, { useState } from "react";

interface EditableTextProps {
  text: string;
  onSave: (newText: string) => void;
}

const EditableText: React.FC<EditableTextProps> = ({ text, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);

  const handleBlur = () => {
    setIsEditing(false);
    if (value !== text) {
      onSave(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <>
      {isEditing ? (
        <input
          type="text"
          value={value}
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="border-b border-gray-400"
        />
      ) : (
        <span
          onClick={() => setIsEditing(true)}
          className="cursor-pointer hover:bg-[#BBDCE5]"
        >
          {text}
        </span>
      )}
    </>
  );
};

export default EditableText;
