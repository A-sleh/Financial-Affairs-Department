import DisplayInputErrors from "../shared/Input-errors-displayer";
import InputeSk from "../skeleton/Inpute.sk";

interface InputProps {
  type: string;
  label?: string;
  fieldName?: string;
  placeholder?: string;
  value?: any;
  required?: boolean;
  disabled?: boolean;
  loadInitalValue?: boolean;
  errors?: any;
  unit?: string;
  className?: string;
  setValue?: (params: any) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  setValue,
  label = "",
  placeholder = "",
  disabled = false,
  required = false,
  className = "",
  loadInitalValue = false,
  unit = "",
  fieldName = "",
  errors = null,
  ...props
}) => {
  return (
    <div className={className}>
      <div
        className={`flex flex-col gap-1 text-right relative `}
        style={{
          opacity: disabled ? "70%" : "100%",
          cursor: disabled ? "not-allowed" : "",
        }}
      >
        {label && (
          <label
            htmlFor="input"
            className="text-sm"
            style={{
              cursor: disabled ? "not-allowed" : "",
            }}
          >
            {required && <span className="text-red-600">*</span>} {label}
          </label>
        )}
        {loadInitalValue ? (
          <InputeSk />
        ) : (
          <>
            <input
              dir="rtl"
              type={type}
              value={value}
              onChange={(e) => setValue?.(e.target.value)}
              placeholder={placeholder}
              disabled={disabled}
              required={required}
              style={{
                cursor: disabled ? "not-allowed" : "",
              }}
              {...props}
              className=" px-3 py-1 bg-primary/20 focus:outline outline-primary-dark rounded-sm shadow-sm"
            />
            <span className="absolute left-3 top-[50%]">{unit}</span>
          </>
        )}
      </div>
      <DisplayInputErrors errors={errors} fieldName={fieldName} />
    </div>
  );
};

export default Input;
