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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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



function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


export default function DenseTable(props:any) {
  console.log('props>>>',typeof(props.data.titular))
  const [jogadores, setJogadores] = useState<any>([]);
// console.log('props',props.data.titular)
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

     let rows: any[] = [] 
     let rows_banco: any[] = [] 
  console.log(props.data.titular)
    for (let i = 0; i < props.data.length; i++) {
      console.log(props.data[i].titular);
        rows.push(props.data.titular[i])
        rows_banco.push(props.data.reserva[i])
      // rows.push(createFormacao(props.jogadores[i].nomeJogador, props.jogadores[i].posicao, props.jogadores[i].numeroDaCamisa));
    }
    
    console.log('titular',rows)
    console.log('reserva',rows_banco)


  
  // console.log(rows)
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
 

  return (
   // Table container with infoData values
   <Box sx={{ width: '100%' }}>
   <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
   <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
     <Tab label="Titular" {...a11yProps(0)} />
     <Tab label="Reserva" {...a11yProps(1)} />
   </Tabs>
 </Box>
 <TabPanel value={value} index={0}>
    <TableContainer component={Paper} sx={{padding: 2, margin: 1}}>
      <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table"  padding="checkbox">
        <TableHead>
          <TableRow>
            <TableCell >Nome do Jogador</TableCell>
            <TableCell align="right">Posição</TableCell>
            <TableCell align="right">Número</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(function (row:any) {
            return (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Stack direction="row" sx={{ padding: 1 }}>
                    {row.nomeJogador}
                    {row.cartaoAmarelo.toString() === 'true' ? <LooksOneIcon sx={{ color: '#FBCA1F', transform: 'rotate(90deg)' }} /> : null}
                    {row.cartaoAmarelo2.toString() === 'true' ? <LooksOneIcon sx={{ color: '#FBCA1F', transform: 'rotate(90deg)' }} /> : null}
                    {row.cartaoVermelho.toString() === 'true' ? <LooksOneIcon sx={{ color: '#F70000', transform: 'rotate(90deg)' }} /> : null}
                    {row.gols > 0 ? <SportsSoccerRoundedIcon sx={{ color: '#1E1E1F', transform: 'rotate(90deg)' }} /> : null}
                  </Stack>
                </TableCell>
                <TableCell align="center">{row.posicao}</TableCell>
                <TableCell align="center">{row.numeroDaCamisa}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>

                
      </Table>
    </TableContainer>
    </TabPanel>

    </Box>

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