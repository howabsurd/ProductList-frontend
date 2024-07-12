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
import { deleteCompany, updateCompany } from '../redux/product/company.slice';
import CompanyModal from './CompanyModel';

export default function CompanyTable() {
  const rows = useSelector(state => state.company.data)
  const [newCompany, setNewCompany] = React.useState();
  const dispatch = useDispatch()
  const {status, error} =useSelector(state => state.company)
  const [open, setOpen] = React.useState(false);

  React.useEffect(()=>{  
    console.log(newCompany)
  },[newCompany])

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if(error){
    return <div>{error}</div>;
  }

  const handleEdit = async (data) =>{
    setOpen(true)
    setNewCompany({...data})
    dispatch(updateCompany)

    return ()=>{
      setNewCompany({})
      setOpen(false)
    }
  }

  
  const handleDelete = async (companyId) => {
    dispatch(deleteCompany(companyId));
  };
  return (
    <>
      <CompanyModal  setNewCompany={setNewCompany} newCompany={newCompany} open={open} setOpen={setOpen}/>
    <TableContainer component={Paper} sx={{marginTop : "5rem"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Company ID</TableCell>
            <TableCell align="right">Company Name</TableCell>
            <TableCell align="right">Compay Alias</TableCell>
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
              <TableCell align="right">{row?.companyName}</TableCell>
              <TableCell align="right">{row?.alias}</TableCell>
              <TableCell align="right"><Button variant='contained' color='primary' onClick={()=> handleEdit(row)}>Edit</Button>
               <Button variant='contained' color='warning' onClick={() => handleDelete(row.company_id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}