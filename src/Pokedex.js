import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Grid, Card, CardContent, CircularProgress, CardMedia, Typography } from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import mockData from './MockData';
import { toFirstCharUppercase } from './constants';

const useStyles = makeStyles({
  pokedexContainer: {
    paddingTop: '20px',
    paddingLeft: '50px',
    paddingRight: '50px',
  },
  cardMedia: {
    margin: 'auto',
  },
  cardContent: {
    textAlign: 'center',
  }
})

const Pokedex = props => {
  // Destructures props and allows for use of history
  const { history } = props;
  const classes = useStyles();

  // pokemonData is the getter
  // setPokemonData is the setter
  // useState(mockData) sets the mockData as the default state
  const [pokemonData, setPokemonData] = useState({});

  // useEffect with an [] is the same as componentDidMount
  useEffect(() => {
    // limited to 807 because sprite images on API only go to 807
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
    .then(function(response) {
      const { data } = response;
      const { results } = data;
      const newPokemonData = {};
      results.forEach((pokemon, index) => {
        newPokemonData[index + 1] = {
          id: index + 1,
          name: pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
        };
      });
      setPokemonData(newPokemonData);
    })
  }, [])
  
  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];
    console.log(pokemonData[pokemonId])
    return(
      <Grid item xs={12} sm={4} ley={pokemonId}>
        {/* This on click pushes the /${pokemonId} into the url */}
        <Card onClick = {() => history.push(`/${pokemonId}`)}>
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{width: '130px', height: '130px'}} />
          {/* using cardcontent helps with spacing */}
          <CardContent className={classes.cardContent}>
            <Typography>{`${id}.${toFirstCharUppercase(name)}`}</Typography>
          </CardContent>
        </Card>
    </Grid>
    )
  }
  return(
    <>
      <AppBar position="static">
        <Toolbar />
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map((pokemonId) => 
            getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  )
}

export default Pokedex