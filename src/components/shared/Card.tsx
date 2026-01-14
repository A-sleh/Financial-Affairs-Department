interface ICardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconColor: string;
  variant: "small" | "medium";
}

export const Card: React.FC<ICardProps> = ({
  icon,
  title,
  value,
  iconColor = "#000",
  variant = "medium",
}) => {
  return (
    <div className={variants.variant[variant].container}>
      {icon && (
        <span
          style={{ color: iconColor, backgroundColor: `${iconColor}20` }}
          className={variants.variant[variant].icon}
        >
          {icon}
        </span>
      )}
      <div className="">
        <h6 className={variants.variant[variant].title}>{title}</h6>
        <h2 className={variants.variant[variant].value}>{value}</h2>
      </div>
    </div>
  );
};

const variants = {
  variant: {
    small: {
      container:
        "flex items-start flex-1  gap-2 px-2 py-1 text-nowrap shadow-sm bg-white rounded-sm",
      icon: "p-2 text-xl rounded-full",
      title: "text-sm text-gray-600",
      value: "text-md font-bold",
    },
    medium: {
      container:
        "flex items-start flex-1  gap-4 px-4 py-2 text-nowrap shadow-sm bg-white rounded-sm",
      icon: "p-3 text-2xl rounded-full",
      title: "text-md text-gray-600",
      value: "text-2xl",
    },
  },
};
