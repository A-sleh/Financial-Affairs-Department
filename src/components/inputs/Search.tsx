import React, { useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";


interface SearchProps {
  value: string;
  placeholder: string;
  setValue: (value: string) => void;
  className?: string;
  children?: React.ReactNode;
}

export const Search: React.FC<SearchProps> = ({
  setValue,
  value,
  placeholder,
  className,
}) => {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <label
      className={`flex gap-3 p-2 text-white bg-primary rounded-sm w-fit cursor-pointer ${className} ${
        isFocused ? "outline-2 outline-primary-dark" : "outline-none"
      }`}
    >
      <IoSearchOutline size={25} className="rotate-90 hover:rotate-12 transition-all" />
      <div className="flex h-6 w-px bg-white " />
      <input
        type="text"
        ref={inputRef}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className={`${isFocused ? "w-40" : "w-28"} placeholder:text-white outline-none transition-all `}
      />
    </label>
  );
};
