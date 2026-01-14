import type { ReactNode } from "react";

interface SelectorProps {
  value: any;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  setValue: (params: any) => void;
  children: ReactNode;
}

const Selector: React.FC<SelectorProps> = ({
  label = "",
  setValue,
  value,
  disabled = false,
  required = false,
  children,
}) => {
  return (
    <div className="flex flex-col gap-1 text-right w-full">
      {label && (
        <label htmlFor="input" className="text-sm">
          {required && <span className="text-red-600">*</span>} {label}
        </label>
      )}
      <select
        dir="rtl"
        value={value}
        disabled={disabled}
        required={required}
        onChange={(e) => setValue(e.target.value)}
        className="px-3 py-1 bg-primary/20 focus:outline outline-primary-dark rounded-sm shadow-sm"
      >
        {children}
      </select>
    </div>
  );
};

export default Selector;
