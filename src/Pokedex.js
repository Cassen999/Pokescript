import React, { useState } from "react";
import { AppBar, Toolbar, Grid, Card, CardContent, CircularProgress, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import mockData from './MockData';

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

 // Makes first character uppercase and .slice is appending the rest of the name
const toFirstCharUppercase = name => 
  name.charAt(0).toUpperCase() + name.slice(1)

const Pokedex = props => {
  // Destructures props and allows for use of history
  const { history } = props;
  const classes = useStyles();

  // pokemonData is the getter
  // setPokemonData is the setter
  // useState(mockData) sets the mockData as the default state
  const [pokemonData, setPokemonData] = useState(mockData);
  
  const getPokemonCard = (pokemonId) => {
    const { id, name } = pokemonData[`${pokemonId}`];
    const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    console.log(pokemonData[`${pokemonId}`])
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