import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "Task is required"),
});

type Schema = z.infer<typeof schema>;

const defaultValues: Schema = {
  title: "",
};

export {
  schema,
  schema as todoSchema,
  defaultValues,
  defaultValues as todoDefaultValues,
  type Schema,
  type Schema as TodoSchema,
};
