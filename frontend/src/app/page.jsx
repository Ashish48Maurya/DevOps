"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Circle, Trash2, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/todo`);
        if (!response.ok) {
          toast.error("Failed to fetch todos.");
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") {
      toast.error("Please enter a valid task.");
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/todo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTodo }),
      });
      if (!response.ok) {
        toast.error("Failed to add todo.");
      }
      const savedTodo = await response.json();
      setTodos([...todos, savedTodo]);
      setNewTodo("");
      toast.success("Task added successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleTodo = async (id, isCompleted) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: !isCompleted }),
      });
      if (!response.ok) {
        toast.error("Failed to update todo.");
      }
      const updatedTodo = await response.json();
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
      toast.success("Task updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/todo/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        toast.error("Failed to delete todo.");
      }
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Task Manager</h1>
        <form onSubmit={addTodo} className="mb-6">
          <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              className="flex-grow px-4 py-3 bg-transparent focus:outline-none text-gray-800"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 focus:outline-none hover:bg-blue-600 transition-colors"
              aria-label="Add task"
            >
              <PlusCircle size={24} />
            </button>
          </div>
        </form>
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.div
              key={todo._id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200"
            >
              <div className="flex items-center flex-grow mr-4">
                <button
                  onClick={() => toggleTodo(todo._id, todo.isCompleted)}
                  className="focus:outline-none mr-3"
                  aria-label={todo.isCompleted ? "Mark as incomplete" : "Mark as complete"}
                >
                  {todo.isCompleted ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <Circle className="text-gray-400" size={24} />
                  )}
                </button>
                <span
                  className={`text-lg ${
                    todo.isCompleted ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {todo.title}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-500 hover:text-red-600 focus:outline-none transition-colors p-2"
                aria-label="Delete task"
              >
                <Trash2 size={20} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        {todos.length === 0 && <p className="text-center text-gray-500 mt-4">No tasks yet. Add one above!</p>}
      </div>
    </div>
  );
}
