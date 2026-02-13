import { ErrorMessage } from "@hookform/error-message";

interface IDisplayInputErrorsProps {
  errors: string[] | null;
  fieldName: string;
}

export default function DisplayInputErrors({
  errors,
  fieldName,
}: IDisplayInputErrorsProps) {
  if (errors) {
    return (
      <ErrorMessage
        errors={errors}
        name={fieldName}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => {
            console.log("type", type, "message", message);
            return (
              <p className="text-red-500 my-2 text-sm" key={type}>
                {message}
              </p>
            );
          })
        }
      />
    );
  }
  return null;
}
