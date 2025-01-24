import express from 'express';
import { addTodo, deleteTodo, getTodos, markComplete } from '../controller/todoController.js';
const router = express.Router();

router.get('/todo',getTodos);
router.post('/todo',addTodo);
router.delete('/todo/:id',deleteTodo);
router.put('/todo/:id',markComplete);

export default router;