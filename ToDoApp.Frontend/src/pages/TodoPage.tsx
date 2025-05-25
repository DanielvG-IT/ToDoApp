import { useEffect, useState } from "react";
import type { Todo } from "@/api/todos";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  fetchTodos,
  createTodo,
  // updateTodo,
  deleteTodo,
} from "@/api/todos";

const PriorityLevel = {
  Low: "Low",
  Normal: "Normal",
  High: "High",
} as const;
type PriorityLevelType = (typeof PriorityLevel)[keyof typeof PriorityLevel];

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDueDate, setNewDueDate] = useState<string>("");
  const [newPriority, setNewPriority] = useState<PriorityLevelType>(
    PriorityLevel.Normal
  );

  const load = async () => {
    const { data } = await fetchTodos();
    setTodos(data);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    if (!newTitle) return;
    const createDto = {
      title: newTitle,
      description: newDescription || undefined,
      dueDate: newDueDate ? new Date(newDueDate).toISOString() : undefined,
      priority: newPriority,
    };
    const { data } = await createTodo(createDto);
    setTodos((t) => [...t, data]);
    setNewTitle("");
    setNewDescription("");
    setNewDueDate("");
    setNewPriority(PriorityLevel.Normal);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <div className="flex flex-col space-y-2">
        <Input
          placeholder="New todo title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <Input
          placeholder="Description (optional)"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <Input
          type="date"
          placeholder="Due date (optional)"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
        />
        <select
          className="border rounded px-2 py-1"
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value as PriorityLevelType)}>
          <option value={PriorityLevel.Low}>Low</option>
          <option value={PriorityLevel.Normal}>Normal</option>
          <option value={PriorityLevel.High}>High</option>
        </select>
        <Button onClick={add}>Add</Button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={todo.isCompleted}
                // onChange={async () => {
                //   const { data } = await updateTodo(todo.id, {
                //     completed: !todo.completed,
                //   });
                //   setTodos((ts) =>
                //     ts.map((t) => (t.id === data.id ? data : t))
                //   );
                // }}
              />
              <span className={todo.isCompleted ? "line-through" : ""}>
                {todo.title}
                {todo.description && (
                  <span className="ml-2 text-sm text-gray-500">
                    ({todo.description})
                  </span>
                )}
                {todo.dueDate && (
                  <span className="ml-2 text-xs text-gray-400">
                    Due: {new Date(todo.dueDate).toLocaleDateString()}
                  </span>
                )}
                <span className="ml-2 text-xs font-semibold">
                  [{todo.priority}]
                </span>
              </span>
            </label>
            <button
              onClick={async () => {
                await deleteTodo(todo.id);
                setTodos((ts) => ts.filter((t) => t.id !== todo.id));
              }}>
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;
