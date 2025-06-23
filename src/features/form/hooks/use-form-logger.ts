import { useFormContext } from "@/features/form/hooks/use-form-context";
import { useEffect } from "react";

const useFormLogger = () => {
  const { watch } = useFormContext();

  useEffect(() => {
    const { unsubscribe } = watch((value) => console.log(value));
    return unsubscribe;
  }, [watch]);
};

export { useFormLogger };
