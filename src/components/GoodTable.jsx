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
import { deleteGood, updateGood } from '../redux/good.slice';
import GoodModal from './GoodModel';

export default function GoodTable() {
  const rows = useSelector(state => state.good.data)
  const [newGood, setNewGood] = React.useState();
  const dispatch = useDispatch()
  const {status, error} =useSelector(state => state.good)
  const [open, setOpen] = React.useState(false);

  React.useEffect(()=>{  
    console.log(newGood)
  },[newGood])

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if(error){
    return <div>{error}</div>;
  }

  const handleEdit = async (data) =>{
    setOpen(true)
    setNewGood({...data})
    dispatch(updateGood)

    return ()=>{
      setNewGood({})
      setOpen(false)
    }
  }

  
  const handleDelete = async (typeid) => {
    console.log(typeid)
    dispatch(deleteGood(typeid));
  };
  return (
    <>
      <GoodModal  setNewGood={setNewGood} newGood={newGood} open={open} setOpen={setOpen}/>
    <TableContainer component={Paper} sx={{marginTop : "5rem"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Type ID</TableCell>
            <TableCell align="right">Type Name</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.typeid}
              </TableCell>
              <TableCell align="right">{row?.name}</TableCell>
              <TableCell align="right"><Button variant='contained' color='primary' onClick={()=> handleEdit(row)}>Edit</Button>
               <Button variant='contained' color='warning' onClick={() => handleDelete(row.typeid)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}