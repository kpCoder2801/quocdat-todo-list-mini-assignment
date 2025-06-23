import React from "react";
import { TodoForm, TodoList } from "./features/todo";
import { ThemeToggle } from "./features/themes";

const App: React.FC = () => {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-tr from-[#302e81] via-[#7ed3fc] to-[#d8f99c] flex flex-col items-center pt-24">
      <div className="w-4/5 h-4/5 flex flex-col gap-4 rounded-sm bg-[rgba(255,255,255,0.4)] p-5 backdrop-blur-lg shadow-md">
        <div className="flex flex-row justify-between gap-4">
          <TodoForm />
          <ThemeToggle />
        </div>
        <TodoList />
      </div>
    </div>
  );
};

export default App;
