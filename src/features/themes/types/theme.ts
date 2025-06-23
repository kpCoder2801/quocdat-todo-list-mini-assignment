import type { ToggleGroupItem } from "@/components/ui/toggle-group";
import type { ComponentProps } from "react";

type ThemeOption = ComponentProps<typeof ToggleGroupItem> & {
  Icon: React.ComponentType<React.ComponentProps<"svg">>;
};

type Theme = "grid" | "list";

export type { ThemeOption, Theme };
