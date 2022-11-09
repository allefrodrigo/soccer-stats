import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import {useState, useEffect} from 'react';


function createFormacao(
  name: string,
  position: string,
  number: number,
)
  {
  return { name, position, number };
  }

const rows2 = [
  createFormacao('Cassio', 'Goleiro', 12),
  createFormacao('Fagner', 'Lateral', 2),
  createFormacao('Gil', 'Zagueiro', 3),
  createFormacao('Edu Dracena', 'Zagueiro', 4),
];
    


function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];




export default function DenseTable(props:any) {
  const [escalacaoJogos, setEscalacaoJogos] = useState({});
  //setEscalacaoJogos(props)
  // console.log('props', props.data.data);
  // console.log('props>>', props.data.data.idPartida);
  setEscalacaoJogos(props.data)

  let stringConvert = JSON.stringify(props.data.data, null, 4);
  console.log('stringConvert', stringConvert);
  console.log(escalacaoJogos)
  // show all data from props divided by rows
 
  // props.data.map((jogo: any) => {
  //   console.log(jogo)
  // })


  return (
    <Typography sx={{ width: '100%', overflowX: 'auto' }}>
      A</Typography>
      
    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>Jogador</TableCell>
    //         <TableCell align="right">Posição</TableCell>
    //         <TableCell align="right">Nº&nbsp;(g)</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {rows2.map((row) => (
    //         <TableRow
    //           key={row.name}
    //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //         >
    //           <TableCell component="th" scope="row">
    //             {row.name}
    //           </TableCell>
    //           <TableCell align="right">{row.position}</TableCell>
    //           <TableCell align="right">{row.number}</TableCell>
    //       </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
}