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
import { deleteCategory, updateCategory } from '../redux/product/category.slice';
import CategoryModal from './CategoryModel';

export default function CategoryTable() {
  const rows = useSelector(state => state.category.data)
  const [newCategory, setNewCategory] = React.useState();
  const dispatch = useDispatch()
  const {status, error} =useSelector(state => state.category)
  const [open, setOpen] = React.useState(false);

  React.useEffect(()=>{  
    console.log(newCategory)
  },[newCategory])

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if(error){
    return <div>{error}</div>;
  }

  const handleEdit = async (data) =>{
    setOpen(true)
    setNewCategory({...data})
    dispatch(updateCategory)

    return ()=>{
      setNewCategory({})
      setOpen(false)
    }
  }

  
  const handleDelete = async (categoryId) => {
    dispatch(deleteCategory(categoryId));
  };
  return (
    <>
      <CategoryModal  setNewCategory={setNewCategory} newCategory={newCategory} open={open} setOpen={setOpen}/>
    <TableContainer component={Paper} sx={{marginTop : "5rem"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category ID</TableCell>
            <TableCell align="right">Category Name</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.map((row) => (
            <TableRow
              key={row.categoryName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.category_id}
              </TableCell>
              <TableCell align="right">{row?.categoryName}</TableCell>
              <TableCell align="right"><Button variant='contained' color='primary' onClick={()=> handleEdit(row)}>Edit</Button>
               <Button variant='contained' color='warning' onClick={() => handleDelete(row.category_id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}