import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { createCompany, updateCompany } from '../redux/company.slice';

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

export default function CompanyModal({ setNewCompany, newCompany, open, setOpen }) {
    const dispatch = useDispatch();
  
  const [errors, setErrors] = React.useState({
    companyName: false,
    alias: false,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrors({
      companyName: false,
      alias: false,
    });
  };

  const handleChange = (e) => {
    setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validation logic
    let formValid = true;
    const newErrors = { ...errors };

    if (newCompany.companyName?.length < 3) {
    newErrors.companyName = true;
      formValid = false;
    } else {
      newErrors.companyName = false;
    }

    if (newCompany.alias.length < 3) {
      newErrors.alias = true;
      formValid = false;
    } else {
      newErrors.alias = false;
    }

    // Update errors state
    setErrors(newErrors);

    // If form is valid, submit
    if (formValid) {
      // Add your form submission logic here
      if(!newCompany.company_id)dispatch(createCompany(newCompany))
        else{dispatch(updateCompany(newCompany))}
      setNewCompany({})
      handleClose();
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Create Company
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Company
          </Typography>
          <FormContainer onSubmit={handleSubmit}>
            <TextField
              required
              id="name"
              label="Name"
              variant="outlined"
              name="companyName"
              value={newCompany?.companyName}
              onChange={handleChange}
              error={errors?.companyName}
              helperText={errors?.companyName ? 'Name must be at least 3 characters' : ''}
            />
            <TextField
              required
              id="email"
              label="Alias"
              type="text"
              variant="outlined"
              name="alias"
              value={newCompany?.alias}
              onChange={handleChange}
              error={errors?.alias}
              helperText={errors.alias ? 'Alias must be at least 3 characters' : ''}
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
