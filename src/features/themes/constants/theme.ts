import { LayoutGrid, Rows } from "lucide-react";
import type { ThemeOption } from "../types/theme";

const THEME_OPTIONS: ThemeOption[] = [
  {
    value: "grid",
    "aria-label": "Toggle grid layout",
    Icon: LayoutGrid,
  },
  {
    value: "list",
    "aria-label": "Toggle list layout",
    Icon: Rows,
  },
];

export { THEME_OPTIONS };
