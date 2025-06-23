import { Input } from "@/components/ui/input";
import {
  forwardRef,
  type ComponentProps,
  type ReactElement,
  type Ref,
} from "react";
import { type FieldValues, type Path } from "react-hook-form";
import { useFormContext } from "../hooks/use-form-context";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/utils/tailwindcss";

type Props<T extends FieldValues> = Omit<
  ComponentProps<typeof Input>,
  "name"
> & {
  name: Path<T>;
  label?: string;
  description?: string;
  slotProps?: {
    container?: ComponentProps<typeof FormItem>;
    label?: ComponentProps<typeof FormLabel>;
    description?: ComponentProps<typeof FormDescription>;
    message?: ComponentProps<typeof FormMessage>;
  };
};

const TextField = forwardRef(
  <T extends FieldValues>(
    { name, label, description, slotProps = {}, ...props }: Props<T>,
    ref: Ref<HTMLInputElement>
  ) => {
    const { control, readOnly } = useFormContext<T>();

    return (
      <FormField
        name={name}
        control={control}
        render={({ field }) => (
          <FormItem
            {...slotProps.container}
            className={cn("w-full h-auto", slotProps.container?.className)}
          >
            {label && <FormLabel {...slotProps?.label}>{label}</FormLabel>}
            <FormControl>
              <Input
                {...props}
                {...field}
                ref={ref}
                disabled={readOnly || props.disabled}
                className={cn(
                  "rounded-sm focus-visible:ring-0",
                  props.className
                )}
              />
            </FormControl>
            {description && (
              <FormDescription {...slotProps?.description}>
                {description}
              </FormDescription>
            )}
            <FormMessage {...slotProps?.message} />
          </FormItem>
        )}
      />
    );
  }
) as <T extends FieldValues>(
  props: Props<T> & { ref?: Ref<HTMLInputElement> }
) => ReactElement;

export { TextField };
