import React from "react";
import { defaultValues, schema, type Schema } from "../types/schema";
import { Form, TextField, useFormContext } from "@/features/form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { SubmitHandler } from "react-hook-form";
import { useAddTodo } from "../hooks/use-mutations";

const FormBody: React.FC = () => {
  const {
    formState: { isValid },
  } = useFormContext<Schema>();

  return (
    <>
      <TextField<Schema>
        name="title"
        placeholder="Add your task"
        className="py-3 h-auto pl-5 pr-20 bg-[rgba(255,255,255,0.5)] shadow-md rounded-full"
        slotProps={{
          container: { className: "gap-1" },
          message: { className: "pl-5" },
        }}
      />
      <Button
        type="submit"
        disabled={!isValid}
        className="py-3 h-auto rounded-full absolute right-0 top-[1px]"
      >
        Add <Plus />
      </Button>
    </>
  );
};

const TodoForm: React.FC = () => {
  const mutation = useAddTodo();

  const onSubmit: SubmitHandler<Schema> = async (data: Schema) => {
    mutation.mutate({ title: data.title });
  };

  return (
    <Form
      mode="onChange"
      onSubmit={onSubmit}
      schema={schema}
      defaultValues={defaultValues}
      className="relative bg-transparent w-4/5"
    >
      <FormBody />
    </Form>
  );
};

export { TodoForm };
