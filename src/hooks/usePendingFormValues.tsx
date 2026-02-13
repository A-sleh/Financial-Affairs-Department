import { useEffect, useState } from "react";
import { useForm as useReactHookForm } from "react-hook-form";
import type {
  FieldValues,
  UseFormProps,
  UseFormReturn,
} from "../../node_modules/react-hook-form/dist/types";

export type UseEnhancedFormReturn<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> = {
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
  handleIgnoreChange: () => void;
  handleApplyChange: (newValues: any) => void;
  showConfirmation: boolean;
};

export function usePendingForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>(
  initialData: any,
  props?: UseFormProps<TFieldValues, TContext, TTransformedValues>,
): UseEnhancedFormReturn<TFieldValues, TContext, TTransformedValues> {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const form = useReactHookForm(props);
  const {
    reset,
    formState: { isDirty },
  } = form;
  const watchAllFields = form.watch();

  useEffect(() => {
    setShowConfirmation(isDirty);
  }, [watchAllFields, showConfirmation]);

  const handleIgnoreChange = () => {
    if (showConfirmation) {
      reset(initialData);
    }
    setShowConfirmation(false);
  };

  const handleApplyChange = (newValues: any) => {
    reset(newValues);
    setShowConfirmation(false);
  };

  return {
    form,
    handleIgnoreChange,
    handleApplyChange,
    showConfirmation,
  };
}
