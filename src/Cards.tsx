import * as React from 'react';
import {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import HomeIcon from '@mui/icons-material/ContentPaste';
import { grey } from '@mui/material/colors';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocalFireDepartmentIcon from '@mui/icons-material/Whatshot';
import Tooltip from '@mui/material/Tooltip';
import SoccerLineUp from 'react-soccer-lineup'
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import HeatMap from './HeatMap';
import Escalacao from './Escalacao';
import LinearProgress from '@mui/material/LinearProgress';
import Table from './Table';
import Confetti from 'react-confetti'
import { css, keyframes } from '@emotion/react'
import { styled } from "@mui/material";

import logoBrasileirao from './logo-catar.png'
import Chip from '@mui/material/Chip';
import {d3} from 'react-d3-library'
const token = '72fa6abf-408';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
};


const Keyframes = styled("div")({
  fontSize: 10, fontWeight: 300, marginTop: 5, color: 'white', backgroundColor: 'red', borderRadius: 100, padding: 5,
  "@keyframes pulse": {
        from: {
      opacity: 1,
      transform: "scale(0.95)",
      boxShadow: "0 0 0 10px rgba(0, 0, 0, 0)"

    },
    to: {
      opacity: 0.96,
      transform: "scale(1)",
      boxShadow: "0 0 0 0 rgba(165, 42, 42, 0.7)"
    }
  },
  animation: "pulse 1.5s infinite",
});




const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`

const live = keyframes`
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	}
`


type Jogo = {
  goalsHome: number,
  goalsAway: number,
  idChampionship: number,
  idTeamHome: number,
  gameTime: string,
  teamAway: string,
  championship: string,
  isoDate: string,
  hasScout: boolean,
  teamUrlLogoAway: string,
  realtime: boolean,
  teamInitialsHome: string,
  teamInitialsAway: string,
  teamUrlLogoHome: string,
  id: number,
}
type GetApiResponse ={
  data: any
}

type GetJogosResponse = {
  data: Jogo[];
}

type User = {
  id: number;
  email: string;
  first_name: string;
};

type GetUsersResponse = {
  data: User[];
};







// function Copyright() {

  
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://github.com/allefrodrigo/">
//         Allef Schmidt
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const cards = [1, 2, 3];

const theme = createTheme();

export default function Cards() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [dataUltima, setDataUltima] = React.useState(new Date());

  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [jogosApi, setJogosApi] = useState([{'goalsHome': 0, 'goalsAway': 0, 'idChampionship': 0, 'idTeamHome': 0, 'gameTime': '', 'teamAway': '', 'championship': '', 'isoDate': '', 'hasScout': false, 'teamUrlLogoAway': '', 'realtime': false, 'teamInitialsHome': '', 'teamInitialsAway': '', 'teamUrlLogoHome': '', 'id': 0}]);
  const [escalacaoJogos, setEscalacaoJogos] = useState({});
  const [escalacaoJogosVisita, setEscalacaoJogosVisita] = useState({});

  function handleEscalacao (numberId: number) {
    handleOpen();
    getEscalacao(numberId)

  }

  let homeTeam = {
    color: "red",
    squad: {
      cam: [{ number: 7, name: "Hicham" }, { number: 8 }, { number: 6 }, { number: 10 }],
      df: [
        { number: 2, name: "Hicham",  },
        { number: 4 },
        { number: 5 },
        { number: 3 }
      ],
      fw: [{ number: 9 }, { number: 11 }],
      gk: { number: 1, color: '#88898C' }
    }
  };

  let awayTeam = {
    color: "red",
    squad: {
      cam: [{ number: 7, name: "Hicham" }, { number: 8 }, { number: 6 }, { number: 10 }],
      df: [
        { number: 2, name: "Hicham",  },
        { number: 4 },
        { number: 5 },
        { number: 3 }
      ],
      fw: [{ number: 9 }, { number: 11 }],
      gk: { number: 1, color: '#d3d3' }
    }
  };
  async function getEscalacao(gameId: number) {
    try {

      const { data, status } = await axios.get<GetApiResponse>(
        `https://footstatsapiapp.azurewebsites.net/partidas/${gameId}/escalacao`,
        {
          headers: {
            Accept: 'application/json',
            'Authorization': `Basic ${token}` 
  
          },
        },
      );
        // console.log('getEscalacao',data.data)
        // console.log('data.data',data.data.tecnicoMandante)
        // console.log('data.titulo',data.data.titular.mandante)
        const mandante = data.data.titular.mandante
        const visitante = data.data.titular.visitante

        setEscalacaoJogos(mandante)
        setEscalacaoJogosVisita(visitante)

       // setEscalacaoJogos(data)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
  }

  function teste  () {
    var node = document.createElement('div');

    var holder = d3.select(node) // select the 'body' element
      .append("svg")           // append an SVG element to the body
      .attr("width", 1200)      
      .attr("height", 600);   

// draw a rectangle - pitch
holder.append("rect")        // attach a rectangle
    .attr("x", 0)         // position the left of the rectangle
    .attr("y", 0)          // position the top of the rectangle
    .attr("height", 500)    // set the height
    .attr("width", 1000)    // set the width
    .style("stroke-width", 5)    // set the stroke width
    .style("stroke", "#001400")    // set the line colour
    .style("fill", "#80B280");    // set the fill colour 


// draw a rectangle - halves
holder.append("rect")        // attach a rectangle
    .attr("x", 0)         // position the left of the rectangle
    .attr("y", 0)          // position the top of the rectangle
    .attr("height", 500)    // set the height
    .attr("width", 500)    // set the width
    .style("stroke-width", 5)    // set the stroke width
    .style("stroke", "#001400")    // set the line colour
    .style("fill", "#80B280");    // set the fill colour 


// draw a circle - center circle
holder.append("circle")          // attach a circle
    .attr("cx", 500)             // position the x-centre
    .attr("cy", 250)             // position the y-centre
    .attr("r", 50)               // set the radius
    .style("stroke-width", 5)    // set the stroke width
    .style("stroke", "#001400")      // set the line colour
    .style("fill", "none");      // set the fill colour


// draw a rectangle - penalty area 1
holder.append("rect")        // attach a rectangle
    .attr("x", 0)         // position the left of the rectangle
    .attr("y", 105)          // position the top of the rectangle
    .attr("height", 290)    // set the height
    .attr("width", 170)    // set the width
    .style("stroke-width", 5)    // set the stroke width
    .style("stroke", "#001400")    // set the line colour
    .style("fill", "#80B280");    // set the fill colour 


// draw a rectangle - penalty area 2
holder.append("rect")        // attach a rectangle
    .attr("x", 830)         // position the left of the rectangle
    .attr("y", 105)          // position the top of the rectangle
    .attr("height", 290)    // set the height
    .attr("width", 170)    // set the width
    .style("stroke-width", 5)    // set the stroke width
    .style("stroke", "#001400")    // set the line colour
    .style("fill", "#80B280");    // set the fill colour 

// draw a rectangle - six yard box 1
holder.append("rect")        // attach a rectangle
    .attr("x", 0)         // position the left of the rectangle
    .attr("y", 184)          // position the top of the rectangle
    .attr("height", 132)    // set the height
    .attr("width", 60)    // set the width
    .style("stroke-width", 5)    // set the stroke width
    .style("stroke", "#001400")    // set the line colour
    .style("fill", "#80B280");    // set the fill colour 

// draw a rectangle - six yard box 2
holder.append("rect")        // attach a rectangle
    .attr("x", 940)         // position the left of the rectangle
    .attr("y", 184)          // position the top of the rectangle
    .attr("height", 132)    // set the height
    .attr("width", 60)    // set the width
    .style("stroke-width", 5)    // set the stroke width
    .style("stroke", "#001400")    // set the line colour
    .style("fill", "#80B280");    // set the fill colour 


// draw a circle - penalty spot 1
holder.append("circle")        // attach a circle
    .attr("cx", 120)           // position the x-centre
    .attr("cy", 250)           // position the y-centre
    .attr("r", 5)             // set the radius
    .style("fill", "#001400");     // set the fill colour

// draw a circle - penalty spot 2
holder.append("circle")        // attach a circle
    .attr("cx", 880)           // position the x-centre
    .attr("cy", 250)           // position the y-centre
    .attr("r", 5)             // set the radius
    .style("fill", "#001400");     // set the fill colour

// draw a circle - center spot
holder.append("circle")        // attach a circle
    .attr("cx", 500)           // position the x-centre
    .attr("cy", 250)           // position the y-centre
    .attr("r", 5)             // set the radius
    .style("fill", "#001400");     // set the fill colour


// penalty box semi-circle 1
var vis = d3.select("body").append("svg")
var pi = Math.PI;
    
var arc = d3.svg.arc()
    .innerRadius(70)
    .outerRadius(75)
    .startAngle(0.75) //radians
    .endAngle(2.4) //just radians
    
var arc2 = d3.svg.arc()
    .innerRadius(70)
    .outerRadius(75)
    .startAngle(-0.75) //radians
    .endAngle(-2.4) //just radians

    holder.append("path")
    .attr("d", arc)
    .attr("fill", "#001400")
    .attr("transform", "translate(120,250)");

    holder.append("path")
    .attr("d", arc2)
    .attr("fill", "#001400")
    .attr("transform", "translate(880,250)");



  }

  const getJogos = async () => {
    try {
      // 👇️ const data: GetUsersResponse
      const { data, status } = await axios.get<GetApiResponse>(
        'https://footstatsapiapp.azurewebsites.net/partidas/hoje',
        {
          headers: {
            Accept: 'application/json',
            'Authorization': `Basic ${token}` 
  
          },
        },
      );
     
      setJogosApi(data.data);
      console.log('Dados solicitados com sucesso');
      const date = new Date();
      setDataUltima(date)
      console.log(dataUltima)
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }
  useEffect(() => {
    getJogos();

  }, []);

  useEffect(() => {

  }, []);

  // getJogos data from API every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      getJogos();
    }, 30000);
    return () => clearInterval(interval);
  }, []);



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
     
        {/* Hero unit */}
 
        <Box
          sx={{
            bgcolor: 'background.paper',
            alignItems: 'center',
            display: 'flex',
          }}
        >
{/*  create a container that all itens are in the center     */}
      <Container maxWidth="lg" >
          {/* End hero unit */}
          
          <Grid container spacing={5}
          direction="row"
          alignItems="center"
          justifyContent="center"
          style={{ maxWidth: 'lg' }}>
            {jogosApi.map((id, index) => (


              <Grid item key={index} xs={12} sm={6} md={4} >
                <Stack spacing={1} direction="row" alignItems="center" justifyContent="center">
                     <Typography  sx={{ fontSize: 13, textAlign: 'center', fontWeight: '800', color: 'black',width: '100%'}}>
                {id.championship}  
                {id.championship === 'Copa do Mundo 2022' ? '🏆' : null} 
                </Typography>
                {id.realtime ? <Keyframes></Keyframes> : null}
</Stack>
                  <Card 
                    sx={{ display: 'flex', flexDirection: 'column ', alignItems:'center', background: '#242424', 
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  
                  }}
                  >
               
                
          

                {/* <CardMedia
                  component="img"
                  sx={{width: '50%', height: '100%'}}
                  image={logoBrasileirao}
                  alt="Live from space album cover"
                />
                 */}

                    <Box  sx={{ display: 'flex', flexDirection: 'row'}}>

                   {/* <Typography  sx={{textAlign: 'center', marginTop: 1, color: 'white',fontSize: 12, fontWeight: 300}}>
                {id.teamInitialsHome}
                    </Typography> */}
                    <Stack direction="row" spacing={1} sx={{padding: 1}}>
                    <Box  sx={{ display: 'flex', flexDirection: 'column'}}>

                  <CardMedia
                    aria-label='team logo'
                    component="img"
                    image={id.teamUrlLogoHome}
                    alt="random"
                    sx={{padding: 0.5, width: 50, height: 50}}
                  />
                    <Typography  sx={{textAlign: 'center', marginTop: 1, color: 'white',fontSize: 12, fontWeight: 300}}>
                {id.teamInitialsHome}
                    </Typography>
                    </Box>
                  
                       <Typography  sx={{textAlign: 'center',color: 'white', fontSize: 40}}>
                {id.goalsHome === null ? 0 : id.goalsHome}
                    </Typography>
             
             
                   
                  <Typography  sx={{textAlign: 'center', alignItems: 'center' ,fontSize: 12, color: '#F6F6F6'}}>
                vs
                    </Typography>

                       

                    <Typography  sx={{textAlign: 'center', color: 'white',fontSize: 40}}>
                {id.goalsAway === null ? 0 : id.goalsAway}
                    </Typography>
                    <Box  sx={{ display: 'flex', flexDirection: 'column'}}>

                    <CardMedia
                    component="img"
                    aria-label='team logo'
                    image={id.teamUrlLogoAway}
                    alt="random"
                    sx={{padding: 0.5, width: 50, height: 50}}

                  />
                      <Typography  sx={{textAlign: 'center', marginTop: 1, color: 'white',fontSize: 12, fontWeight: 300}}>
                {id.teamInitialsAway}
                    </Typography>
                  </Box>

                    </Stack>
                  </Box>
                 

                {
                  id.gameTime !== 'Não Inic.' ? (
                    <Box sx={{ width: '100%' }}>
{ id.gameTime === 'Final' ? (
  <LinearProgress color='success' variant="determinate" value={100} />) : (
    <LinearProgress color='error'/>
    )
}

    </Box>
    ) : (<> </>)
                  
}
                    <Typography  sx={{textAlign: 'center', fontWeight: '300', color: 'white', background: id.gameTime === 'Não Inic.' ? '#383838' : id.gameTime ==='Final' ? '#446418' : '#C7070F', width: '100%'}}>
                {id.gameTime === 'Não Inic.' ? 'Jogo não iniciado' : id.gameTime}
                    </Typography>
                    
                  </Card>
                  <Typography  sx={{marginTop: 1, textAlign: 'center', color: 'black', fontSize: 12, fontWeight: 300}}>
                {id.isoDate.split('T')[1]}
                    </Typography>
                  {/* <Box sx={{flexDirection: 'row', margin: 1, alignItems: 'center', justifyContent: 'center', display: 'flex', width: '100%'}}>
                  <Tooltip title="Dados Gerais">
                    <SportsSoccerIcon onClick={()=>{
                      // handleEscalacao(199771) 
                    }}sx={{ color: grey[500] }} />
                  </Tooltip>
                  <Tooltip title="Escalação">
                    <HomeIcon  onClick={()=>{
                       handleEscalacao(id.id) 
                    }}
         sx={{ color: grey[500] }} />
                    </Tooltip>

                    <Tooltip title="Heatmap">

                    <LocalFireDepartmentIcon  sx={{ color: grey[500] }} />
                    </Tooltip>

                    <Tooltip title="Notificações">
                    <NotificationsIcon onClick={ () => {
                      teste()
                      console.log('tentei')
                    }} sx={{ color: grey[500] }} />
                    </Tooltip>

                    </Box> */}
                  {/* <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can e this section to describe the
                      content.
                    </Typography>
                  </CardContent> */}
            
              </Grid>
            ))}
          </Grid>
          <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        sx={{      backgroundColor: 'transparent'}}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {/* <HeatMap> </HeatMap> */}
            {/* <Typography id="transition-modal-title" variant="h6" component="h2">
              Escalação
            </Typography> */}
             <Typography id="transition-modal-description" sx={{ width: '100%', textAlign: 'center', fontWeight: '400', fontSize: 20, color: 'black' }}>
              Escalação
              </Typography>



                          <Stack direction='row'>
             
             
              <Table data={escalacaoJogos}/>

       <Table  data={escalacaoJogosVisita}/>
</Stack>
          </Box>
        </Fade>
      </Modal>
        </Container>
=        </Box>
      <Box sx={{ bgcolor: 'background.paper'}} component="footer">

        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Útilma atualização: {(dataUltima.toString()).split('GMT')[0]} ⚽
        </Typography>
        {/* <Copyright /> */}
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}