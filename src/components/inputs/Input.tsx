interface InputProps {
  value: any;
  type: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  setValue: (params: any) => void;
}

const Input: React.FC<InputProps> = ({
  label = "",
  placeholder = "",
  setValue,
  type,
  value,
  disabled = false,
  required = false,
}) => {
  return (
    <div className="flex flex-col gap-1 text-right">
      {label && (
        <label htmlFor="input" className="text-sm">
          {required && <span className="text-red-600">*</span>} {label}
        </label>
      )}

      <input
        dir="rtl"
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className="px-3 py-1 bg-primary/20 focus:outline outline-primary-dark rounded-sm shadow-sm"
      />
    </div>
  );
};

export default Input;
