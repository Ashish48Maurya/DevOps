import Todo from "../model/todoModel.js";
const addTodo = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required." });
        };
        const newTodo = new Todo({ title });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ message: "Error adding todo.", error: error.message });
    }
};

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching todos.", error: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            return res.status(400).json({ message: "Id is required." });
        };
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found." });
        }
        res.status(200).json({ message: "Todo deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting todo.", error: error.message });
    }
};

const markComplete = async (req, res) => {
    try {
        const { id } = req.params;
        const { isCompleted } = req.body;
        if(!id && !isCompleted){
            return res.status(400).json({ message: "Id and isCompleted are required." });
        };
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { isCompleted },
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found." });
        }
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: "Error updating todo.", error: error.message });
    }
};

export { addTodo, getTodos, deleteTodo, markComplete };