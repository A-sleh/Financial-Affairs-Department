import React, { useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
interface SearchProps {
  value: string;
  placeholder: string;
  setValue: (value: string) => void;
  type?: "primary" | "secondary";
  children?: React.ReactNode;
}

export const Search: React.FC<SearchProps> = ({
  setValue,
  value,
  placeholder,
  type = "primary",
}) => {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <label
      className={` ${variants.variant[type].label} ${
        isFocused ? "outline-2 outline-primary-dark" : "outline-none"
      }`}
    >
      <IoSearchOutline className={variants.variant[type].icon} />
      <div className={variants.variant[type].divider} />
      <input
        type="text"
        ref={inputRef}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className={`${isFocused ? "w-40" : "w-28"}  ${
          variants.variant[type].input
        }`}
      />
    </label>
  );
};

const variants = {
  variant: {
    primary: {
      input: "outline-none transition-all placeholder:text-white",
      label: "flex gap-3 p-2 text-white bg-primary rounded-sm w-fit cursor-pointer",
      divider: "flex h-6 w-px bg-white",
      icon: "text-2xl rotate-90 hover:rotate-12 transition-all",
    },
    secondary: {
      input: "placeholder:text-black/70 outline-none transition-all",
      label: "flex gap-3 px-2 py-0.5 text-black border rounded-sm w-fit cursor-pointer",
      divider: "hidden",
      icon: "text-xl mt-0.5 rotate-90 hover:rotate-12 transition-all",
    },
  },
};
