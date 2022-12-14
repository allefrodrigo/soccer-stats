import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import LooksOneIcon from '@mui/icons-material/RectangleRounded';
import {useState, useEffect} from 'react';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function createFormacao(
  name: string,
  position: string,
  number: number,
)
  {
  return { name, position, number };
  }




function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}





export default function DenseTable(props:any) {
  const [jogadores, setJogadores] = useState<any>([]);

  if (props.data.length === 0) {
    console.log('semdados')
    return (
      <Typography id="table-info" sx={{ width: '100%', textAlign: 'center', fontWeight: '400', fontSize: 25, color: 'black' }}>
      A escalação ainda não foi definida
      </Typography>
    )
  }

  if (props == null) {
    return null;
  }

     let rows = [];
    for (let i = 0; i < props.data.length; i++) {
      // console.log(props.data[i]);
      rows.push(props.data[i])
      console.log(rows)
      // rows.push(createFormacao(props.jogadores[i].nomeJogador, props.jogadores[i].posicao, props.jogadores[i].numeroDaCamisa));
    }

  
  // console.log(rows)

 

  return (
   // Table container with infoData values
    <TableContainer component={Paper} sx={{padding: 2, margin: 1}}>
      <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nome do Jogador</TableCell>
            <TableCell align="right">Posição</TableCell>
            <TableCell align="right">Número</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row:any) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Stack direction="row"  sx={{padding: 1}}>
                {row.nomeJogador}
                {row.cartaoAmarelo.toString() === 'true' ? <LooksOneIcon sx={{ color: '#FBCA1F', transform: 'rotate(90deg)'}} /> : null}
                {row.cartaoAmarelo2.toString() === 'true' ? <LooksOneIcon sx={{ color: '#FBCA1F', transform: 'rotate(90deg)'}} /> : null}
                {row.cartaoVermelho.toString() === 'true' ? <LooksOneIcon sx={{ color: '#F70000', transform: 'rotate(90deg)'}} /> : null}
                {row.gols > 0 ? <SportsSoccerRoundedIcon sx={{ color: '#1E1E1F', transform: 'rotate(90deg)'}} /> : null}
                </Stack>
              </TableCell>
              <TableCell align="right">{row.posicao}</TableCell>
              <TableCell align="right">{row.numeroDaCamisa}</TableCell>
            </TableRow>
          ))}
        </TableBody>

                
      </Table>
    </TableContainer>
  );

  



// { for (let i = 0; i < infoData.length; i++) {
//     console.log('infoData',infoData[i])
//     // populate setEscalacaoJogos with infoData
//   //  setEscalacaoJogos(infoData[i].formacao)
//   }
// } 
 // console.log('escalacaoJogos',escalacaoJogos)
 //loop that go through the data and create the table
//  setEscalacaoJogos(infoData)
//  console.log(escalacaoJogos)


  // useEffect(() => {
  //   const data = infoData;
  //   console.log('data',data)
  //   setEscalacaoJogos(prevState => ({
  //     ...prevState,
  //     data
  //     }));

  // }, [infoData]);
  


  
  //console.log(props);
  // console.log reservas
  // console.log('>>>>',infoData)
  // console.log(infoData.id)
  // console.log(infoData.tecnicoMandante)
  //setEscalacaoJogos(props)
  // console.log('props', props.data.data);
  // console.log('props>>', props.data.data.idPartida);
  //setEscalacaoJogos(props.data)

  // let stringConvert = JSON.stringify(props.data.data, null, 4);
  // console.log('stringConvert', stringConvert);
  
  //console.log(escalacaoJogos)
  // show all data from props divided by rows
 
  // props.data.map((jogo: any) => {
  //   console.log(jogo)
  // })


  return (
    
   
      
    <TableContainer component={Paper}>
       <Typography sx={{ width: '100%', overflowX: 'auto' }}>
      </Typography>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Jogador</TableCell>
            <TableCell align="right">Posição</TableCell>
            <TableCell align="right">Nº&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
          {/* {escalacaoJogos.map((row:any) => (
            <TableRow
            
              key={row.name}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.position}</TableCell>
              <TableCell align="right">{row.number}</TableCell>
            </TableRow>
          ))} */}

                 
          

            


        </TableBody>
      </Table>
    </TableContainer>
  );
}