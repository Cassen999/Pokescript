import React, { useEffect, useState } from "react";
import { Typography, CircularProgress, Button, Grid } from '@material-ui/core';
import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
import { makeStyles } from '@material-ui/core/styles';
import { toFirstCharUppercase } from './constants';
import red from '@material-ui/core/colors/red';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  infoContainer: {
    paddingTop: '20px',
    paddingLeft: '50px',
    paddingRight: '50px',
    margin: '5px',
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 'fit',
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Pokemon = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { history, match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(function(response) {
      const { data } = response;
      setPokemon(data);
    })
    .catch((error) => {
      setPokemon(false);
    })
  }, [pokemonId])

  // Three states being used
  // 1. pokemon = undefined, this means we're getting the info from the API -> return loading progress
  // 2. pokemon = good data, this means we've gotten the data -> return actual data
  // 3. pokemon = bad data / false -> return pokemon not found

  const generatePokemonJsx = () => {
    const { name, id, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return(
      <>
      <center>
        <Typography variant='h1'>
          {`${id}.`} {toFirstCharUppercase(name)}
          <img src={front_default} />
        </Typography>
        <img style={{width:'300px', height: '300px'}} src={fullImageUrl} alt={`Selected Pokemon`}/>
        <Typography variant='h3'>Pokemon Info</Typography>
        <Grid item xs={12} sm={4}>
          <Typography>Height: {height}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
        <Typography>Weight: {weight}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant='h6'>Types: </Typography>
          {types.map((typeInfo) => {
            const { type } = typeInfo;
            const { name } = type;
            return <Typography key={name}>{`${name}`}</Typography>;
          })}
        </Grid>
      </center>
      </>
    );
  }
  return(
   <div className={classes.infoContainer}>
    {pokemon === undefined && <CircularProgress />}
    {pokemon !== undefined && pokemon && generatePokemonJsx()}
    {pokemon === false && <Typography>Pokemon not found</Typography>}
    {pokemon !== undefined && (
      <center>
        <></>
        <Button 
          variant='contained' 
          color="primary" 
          onClick={() => history.push('/')}>
          <LaptopChromebookIcon /> Back to Pokedex <LaptopChromebookIcon />
        </Button >
      </center>
    )}
   </div>
  );
}

export default Pokemon