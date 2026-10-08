import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
} from "@mui/material";
import TodoItem from "./components/TodoItem";

export default function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "เกิดวันแรก็อยากเรียน React และ Vite",
      priority: "Medium",
      dueDate: "1989-10-24",
      completed: false,
    },
    {
      id: 2,
      title: "กำเนิด Piyanath สวัสดีชาวโลก",
      priority: "High",
      dueDate: "1989-10-23",
      completed: true,
    },
  ]);

  const [inputTitle, setInputTitle] = useState("");
  const [inputPriority, setInputPriority] = useState("Medium");
  const [inputDueDate, setInputDueDate] = useState("1989-10-23");

  // ฟังก์ชันเพิ่ม Todo ใหม่
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputTitle.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: inputTitle,
      priority: inputPriority,
      dueDate: inputDueDate || new Date().toISOString().split("T")[0],
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setInputTitle("");
    setInputPriority("Medium");
    setInputDueDate("");
  };

  // ฟังก์ชันสลับสถานะการเสร็จสิ้น (Toggle Complete)
  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // ฟังก์ชันลบ Todo
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // ฟังก์ชันแก้ไขข้อความ Todo
  const handleEdit = (id, newTitle) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo,
      ),
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        fontWeight="bold"
      >
        Smart Todo
      </Typography>

      {/* ฟอร์มสำหรับเพิ่ม Todo รองรับ Responsive */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box component="form" onSubmit={handleAddTodo}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                label="หัวข้องาน (Title)"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                select
                label="ความสำคัญ (Priority)"
                value={inputPriority}
                onChange={(e) => setInputPriority(e.target.value)}
                size="small"
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                type="date"
                label="กำหนด"
                InputLabelProps={{ shrink: true }}
                value={inputDueDate}
                onChange={(e) => setInputDueDate(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ height: "100%" }}
              >
                เพิ่ม
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* แสดงรายการ Todo */}
      <Box>
        {todos.length === 0 ? (
          <Typography align="center" color="textSecondary">
            ยังไม่มีรายการ Todo ในขณะนี้
          </Typography>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              priority={todo.priority}
              dueDate={todo.dueDate}
              completed={todo.completed}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </Box>
    </Container>
  );
}
