import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { createCategory, updateCategory } from '../redux/product/category.slice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const FormContainer = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export default function CategoryModal({ setNewCategory, newCategory, open, setOpen }) {
    const dispatch = useDispatch();
  
  const [errors, setErrors] = React.useState({
    categoryName: false,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrors({
      categoryName: false,
    });
  };

  const handleChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validation logic
    let formValid = true;
    const newErrors = { ...errors };

    if (newCategory.categoryName?.length < 3) {
    newErrors.categoryName = true;
      formValid = false;
    } else {
      newErrors.categoryName = false;
    }

    // Update errors state
    setErrors(newErrors);

    // If form is valid, submit
    if (formValid) {
      // Add your form submission logic here
      if(!newCategory.category_id)dispatch(createCategory(newCategory))
        else{dispatch(updateCategory(newCategory))}
      setNewCategory({})
      handleClose();
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Create Category
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Category
          </Typography>
          <FormContainer onSubmit={handleSubmit}>
            <TextField
              required
              id="name"
              label="Name"
              variant="outlined"
              name="categoryName"
              value={newCategory?.categoryName}
              onChange={handleChange}
              error={errors?.categoryName}
              helperText={errors?.categoryName ? 'Name must be at least 3 characters' : ''}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </FormContainer>
        </Box>
      </Modal>
    </div>
  );
}
