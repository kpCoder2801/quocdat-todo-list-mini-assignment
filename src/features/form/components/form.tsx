import { type PropsWithChildren } from "react";
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type SubmitErrorHandler,
  type SubmitHandler,
  type UseFormProps,
} from "react-hook-form";
import { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FormContext } from "../types/form-context";
import { Form as ShadCNForm } from "@/components/ui/form";

type Props<T extends FieldValues> = PropsWithChildren & {
  schema: ZodSchema<T>;
  onSubmit: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
  mode?: UseFormProps<T>["mode"];
  values?: UseFormProps<T>["values"];
  defaultValues?: DefaultValues<T>;
  readOnly?: boolean;
  className?: string;
};

const Form = <T extends FieldValues>({
  children,
  schema,
  onSubmit,
  onError,
  mode = "onBlur",
  values,
  defaultValues,
  readOnly = false,
  className,
}: Props<T>) => {
  const form = useForm<T>({
    mode,
    values,
    defaultValues,
    resolver: zodResolver(schema),
  });

  const extendedForm: FormContext<T> = {
    ...form,
    readOnly,
  };

  const _onSubmit: SubmitHandler<T> = (data, event) => {
    event?.preventDefault();

    if (readOnly) return;

    onSubmit(data);
    form.reset();
  };

  return (
    <ShadCNForm {...extendedForm}>
      <form
        onSubmit={form.handleSubmit(_onSubmit, onError)}
        className={className}
      >
        {children}
      </form>
    </ShadCNForm>
  );
};

export { Form };
