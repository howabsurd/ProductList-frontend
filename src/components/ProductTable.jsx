import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import ProductModel from './productModel';
import { deleteProduct } from '../redux/product.slice';

export default function ProductTable() {
    const dispatch = useDispatch();
  const rows = useSelector(state => state.product.data)
  const [newProduct , setNewProduct ] = React.useState({});
    const [open , setOpen] = React.useState(false);

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    }

  return (
    <>
      <ProductModel  setNewProduct={setNewProduct} newProduct={newProduct} open={open} setOpen={setOpen}/>
    <TableContainer component={Paper} sx={{marginTop : "5rem"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Id</TableCell>
            <TableCell align="right">Product Name</TableCell>
            <TableCell align="right">Company ID</TableCell>
            <TableCell align="right">Category ID</TableCell>
            <TableCell align="right">TypeOfGoodID</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.map((row) => (
            <TableRow
              key={row.companyName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.company_id}
              </TableCell>
              <TableCell align="right">{row?.id}</TableCell>
              <TableCell align="right">{row?.name}</TableCell>
              <TableCell align="right">{row?.companyId}</TableCell>
              <TableCell align="right">{row?.categoryId}</TableCell>
              <TableCell align="right">{row?.typeofGoodId}</TableCell>
              <TableCell align="right">
                {/* <Button variant='contained' color='primary'>Edit</Button> */}
               <Button variant='contained' color='warning' onClick={() => handleDelete(row.id)} >Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}