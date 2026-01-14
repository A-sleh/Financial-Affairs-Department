interface TabsAsCheckBoxProps {
  value: any;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  setValue: (params: any) => void;
  values: {
    title: string;
    value: string;
  }[];
}

const TabsAsCheckBox: React.FC<TabsAsCheckBoxProps> = ({
  label = "",
  setValue,
  value,
  disabled = false,
  required = false,
  values = [],
}) => {
  return (
    <div className="flex flex-col gap-1 text-right w-full">
      {label && (
        <label htmlFor="input" className="text-sm">
          {required && <span className="text-red-600">*</span>} {label}
        </label>
      )}
      <div className="flex gap-2 items-center flex-wrap">
        {values.map((item, Idx) => (
          <button
            key={Idx}
            onClick={() => !disabled&&setValue(item.value)}
            className={`text-sm flex-1 px-2 py-1.5 ${
              item.value == value ? "bg-primary text-white" : "bg-primary/20"
            }  hover:bg-primary hover:text-white rounded-sm transition-all cursor-pointer`}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabsAsCheckBox;
