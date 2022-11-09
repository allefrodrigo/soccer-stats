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
import logoBrasileirao from './logo-brasileirao-2048.png'
const token = '72fa6abf-408';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

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







function Copyright() {

  
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/allefrodrigo/">
        Allef Schmidt
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3];

const theme = createTheme();

export default function Cards() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [jogosApi, setJogosApi] = useState([{'goalsHome': 0, 'goalsAway': 0, 'idChampionship': 0, 'idTeamHome': 0, 'gameTime': '', 'teamAway': '', 'championship': '', 'isoDate': '', 'hasScout': false, 'teamUrlLogoAway': '', 'realtime': false, 'teamInitialsHome': '', 'teamInitialsAway': '', 'teamUrlLogoHome': '', 'id': 0}]);
  const [escalacaoJogos, setEscalacaoJogos] = useState({});

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
        console.log('getEscalacao',data)
        setEscalacaoJogos(data)
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

  async function getJogos() {
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
      console.log(jogosApi)
      // setJogosApi(data.data);
      // setJogosApi(jogosApi.filter(jogo => jogo.idChampionship === 1));
      // console.log(jogosApi);
      //console.log();
      // console.log(typeof(data))
      // 👇️ "response status is: 200"
      //setJogos(JSON.stringify(data, null, 4));
      // console.log('response status is: ', status);
      // setJogosApi(data)
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
            {jogosApi.reverse().map((id, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                
               
                  <Card 
                    sx={{ display: 'flex', flexDirection: 'column ', alignItems:'center', background: '#242424', 
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  
                  }}
                  >
                    <Typography  sx={{textAlign: 'center', fontWeight: '800', color: 'white', background: '#383838',width: '100%'}}>
                {id.championship}

                {/* <CardMedia
                  component="img"
                  sx={{width: '50%', height: '100%'}}
                  image={logoBrasileirao}
                  alt="Live from space album cover"
                />
                 */}

                    </Typography>
                    <Box  sx={{ display: 'flex', flexDirection: 'row'}}>

                   <Box sx={{flexDirection: 'column'}}> 
                   <Typography  sx={{textAlign: 'center', marginTop: 1, color: 'white',fontSize: 12, fontWeight: 300}}>
                {id.teamInitialsHome}
                    </Typography>
                  <CardMedia
                    aria-label='team logo'
                    component="img"
                    image={id.teamUrlLogoHome}
                    alt="random"
                  />
                  
                       <Typography  sx={{textAlign: 'center',color: 'white', fontSize: 40}}>
                {id.goalsHome === null ? 0 : id.goalsHome}
                    </Typography>
                  </Box>
             
             
                   
               

                  <Box sx={{flexDirection: 'column'}}> 
                  <Typography  sx={{textAlign: 'center', marginTop: 1, color: 'white',fontSize: 12, fontWeight: 300}}>
                {id.teamInitialsAway}
                    </Typography>
                    <CardMedia
                    component="img"
                    aria-label='team logo'
                    image={id.teamUrlLogoAway}
                    alt="random"
                  />
                       <Typography  sx={{textAlign: 'center', color: 'white',fontSize: 40}}>
                {id.goalsAway === null ? 0 : id.goalsAway}
                    </Typography>
                  </Box>
                 

                    </Box>
                {
                  id.gameTime !== 'Não Inic.' ? (
                    <Box sx={{ width: '100%' }}>
      <LinearProgress color='error'/>
    </Box>
    ) : (<> </>)
                  
}
                    <Typography  sx={{textAlign: 'center', fontWeight: '800', color: 'white', background: id.gameTime === 'Não Inic.' ? '#383838' : '#C7070F', width: '100%'}}>
                {id.gameTime}
                    </Typography>
                    
                  </Card>
                  <Typography  sx={{marginTop: 1, textAlign: 'center', color: 'black', fontSize: 12, fontWeight: 300}}>
                {id.isoDate.split('T')[1]}
                    </Typography>
                  <Box sx={{flexDirection: 'row', margin: 1, alignItems: 'center', justifyContent: 'center', display: 'flex', width: '100%'}}>
                  <Tooltip title="Dados Gerais">
                    <SportsSoccerIcon sx={{ color: grey[500] }} />
                  </Tooltip>
                  <Tooltip title="Escalação">
                    <HomeIcon  onClick={()=>{
                      // handleEscalacao(199870) 
                    }}
         sx={{ color: grey[500] }} />
                    </Tooltip>

                    <Tooltip title="Heatmap">

                    <LocalFireDepartmentIcon sx={{ color: grey[500] }} />
                    </Tooltip>

                    <Tooltip title="Notificações">
                    <NotificationsIcon sx={{ color: grey[500] }} />
                    </Tooltip>

                    </Box>
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
       <Table data={escalacaoJogos}/>
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
          LBR Foot Stats ⚽
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}