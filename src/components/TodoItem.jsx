import  { useState } from 'react';
import { 
  Paper, Box, Typography, Checkbox, IconButton, 
  Chip, TextField, Tooltip 
} from '@mui/material';
import { Edit, Delete, Check, Close } from '@mui/icons-material';

export default function TodoItem({ id, title, priority, dueDate, completed, onToggle, onDelete, onEdit }) {
  // State ควบคุมสถานะการแก้ไข (Edit Mode)
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  // กำหนดสีของ Chip ตามระดับความสำคัญ (Priority)
  const getPriorityColor = (level) => {
    switch (level) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  // บันทึกการแก้ไข
  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      onEdit(id, editedTitle);
      setIsEditing(false);
    }
  };

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 2, 
        mb: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexWrap: { xs: 'wrap', sm: 'nowrap' }, // ปรับ Layout ตามขนาดหน้าจอ (Responsive)
        gap: 2,
        backgroundColor: completed ? '#f9f9f9' : '#fff',
        borderLeft: `6px solid ${completed ? '#9e9e9e' : '#1976d2'}`
      }}
    >
      {/* ส่วนซ้าย: Checkbox และ ข้อความ/ฟอร์มแก้ไข */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1, minWidth: 200 }}>
        {/* Checkbox สำหรับเปลี่ยนสถานะ completed */}
        <Checkbox 
          checked={completed} 
          onChange={() => onToggle(id)} 
        />

        {isEditing ? (
          // กรณีอยู่ในโหมดแก้ไข แสดง TextField
          <TextField 
            fullWidth
            size="small"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          // กรณีแสดงผลปกติ
          <Box>
            <Typography 
              variant="body1" 
              sx={{ 
                textDecoration: completed ? 'line-through' : 'none',
                color: completed ? 'text.secondary' : 'text.primary',
                fontWeight: 500
              }}
            >
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              กำหนดส่ง: {dueDate}
            </Typography>
          </Box>
        )}
      </Box>

      {/* ส่วนขวา: ป้ายสถานะ Priority และปุ่มจัดการต่างๆ */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
        <Chip 
          label={priority} 
          color={getPriorityColor(priority)} 
          size="small" 
          variant="outlined" 
        />

        {isEditing ? (
          <>
            <Tooltip title="บันทึก">
              <IconButton color="primary" onClick={handleSaveEdit} size="small">
                <Check />
              </IconButton>
            </Tooltip>
            <Tooltip title="ยกเลิก">
              <IconButton color="default" onClick={() => setIsEditing(false)} size="small">
                <Close />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="แก้ไข">
              <IconButton color="info" onClick={() => setIsEditing(true)} size="small">
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="ลบ">
              <IconButton color="error" onClick={() => onDelete(id)} size="small">
                <Delete />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Box>
    </Paper>
  );
}