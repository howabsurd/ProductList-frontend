import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../redux/product.slice';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';

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
export default function ProductModal({ setNewProduct, newProduct, open, setOpen }) {
    React.useEffect(()=>{
        console.log(newProduct)
    }, [newProduct])
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(newProduct));
    handleClose();
  }

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  }

  const companies = useSelector(state => state.company.data);
  const typeOfGoods = useSelector(state => state.good.data);
  const categories = useSelector(state => state.category.data);

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Create Product
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Product
          </Typography>
          <FormContainer onSubmit={handleSubmit}>
            <TextField
              required
              id="name"
              label="Name"
              variant="outlined"
              name="name"
              value={newProduct?.name}
              onChange={handleChange}
            />
             <TextField
              required
              id="sellingPrice"
              label="Selling Price"
              variant="outlined"
              name="sellingPrice"
              value={newProduct?.sellingPrice}
              onChange={handleChange}
               type="number"
            />
             <TextField
              required
              id="costPrice"
              label="Cost Price"
              variant="outlined"
              name="costPrice"
              value={newProduct?.costPrice}
              onChange={handleChange}
               type="number" 
            />
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="categoryId"
                value={newProduct?.categoryId}
                onChange={handleChange}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category.category_id} value={category.category_id}>
                    {category.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="company-label">Company</InputLabel>
              <Select
                labelId="company-label"
                id="company"
                name="companyId"
                value={newProduct?.companyId}
                onChange={handleChange}
                label="Company"
              >
                {companies.map((company) => (
                  <MenuItem key={company.company_id} value={company.company_id}>
                    {company.companyName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="typeOfGood-label">Type Of Good</InputLabel>
              <Select
                labelId="typeOfGood-label"
                id="typeofGood"
                name="typeofGoodId"
                value={newProduct?.typeofGoodId}
                onChange={handleChange}
                label="Good"
              >
                {typeOfGoods.map((good) => (
                  <MenuItem key={good.typeid} value={good.typeid}>
                    {good.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </FormContainer>
        </Box>
      </Modal>
    </div>
  );
}
