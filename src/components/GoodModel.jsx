import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { createGood, updateGood } from '../redux/good.slice';

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

export default function GoodModal({ setNewGood, newGood, open, setOpen }) {
    const dispatch = useDispatch();
  
  const [errors, setErrors] = React.useState({
    navigatorame: false,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrors({
      name: false,
    });
  };

  const handleChange = (e) => {
    setNewGood({ ...newGood, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validation logic
    let formValid = true;
    const newErrors = { ...errors };

    if (newGood.name?.length < 3) {
    newErrors.name = true;
      formValid = false;
    } else {
      newErrors.name = false;
    }

    // Update errors state
    setErrors(newErrors);

    // If form is valid, submit
    if (formValid) {
      // Add your form submission logic here
      if(!newGood.typeid)dispatch(createGood(newGood))
        else{dispatch(updateGood(newGood))}
      setNewGood({})
      handleClose();
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Create Good
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Good
          </Typography>
          <FormContainer onSubmit={handleSubmit}>
            <TextField
              required
              id="name"
              label="Name"
              variant="outlined"
              name="name"
              value={newGood?.name}
              onChange={handleChange}
              error={errors?.name}
              helperText={errors?.name ? 'Name must be at least 3 characters' : ''}
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
