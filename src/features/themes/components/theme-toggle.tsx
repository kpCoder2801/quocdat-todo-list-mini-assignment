import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React from "react";
import { THEME_OPTIONS } from "../constants/theme";
import { useTheme } from "../hooks/use-theme";
import type { Theme } from "../types/theme";
import { cn } from "@/utils/tailwindcss";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const onChange = (value: string | null) => {
    if (value) {
      setTheme(value as Theme);
    }
  };

  return (
    <ToggleGroup
      type="single"
      className="shadow-md rounded-full px-2 py-0"
      aria-label="Layout toggle"
      value={theme}
      onValueChange={onChange}
    >
      {THEME_OPTIONS.map(({ Icon, ...props }) => (
        <ToggleGroupItem
          key={props.value}
          {...props}
          className={cn("data-[state=on]:bg-white py-2", props?.className)}
        >
          <Icon className="size-4" />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export { ThemeToggle };
