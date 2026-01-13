interface ICardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconColor: string;
}

export const Card: React.FC<ICardProps> = ({
  icon,
  title,
  value,
  iconColor = "#000",
}) => {
  return (
    <div className="flex items-start flex-1  gap-4 px-4 py-2 text-nowrap shadow-sm">
      <span
        style={{ color: iconColor, backgroundColor: `${iconColor}20` }}
        className={`p-3 text-2xl rounded-full`}
      >
        {icon}
      </span>
      <div className="">
        <h6 className="text-md text-gray-600">{title}</h6>
        <h2 className="text-2xl">{value}</h2>
      </div>
    </div>
  );
};
