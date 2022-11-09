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
const token = '72fa6abf-408'

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







const cards = [1, 2, 3];

const theme = createTheme();

export default function Escalacao() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [jogosApi, setJogosApi] = useState([{'goalsHome': 0, 'goalsAway': 0, 'idChampionship': 0, 'idTeamHome': 0, 'gameTime': '', 'teamAway': '', 'championship': '', 'isoDate': '', 'hasScout': false, 'teamUrlLogoAway': '', 'realtime': false, 'teamInitialsHome': '', 'teamInitialsAway': '', 'teamUrlLogoHome': '', 'id': 0}]);


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
   // getJogos();
  }, []);


  return (

<SoccerLineUp
              size={'big' }
              color={ "#5c664a" }
              pattern={ "circles" }
              awayTeam={awayTeam}
              homeTeam={homeTeam}
            />
  );
}