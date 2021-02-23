import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Grid, Card, CardContent, CircularProgress, CardMedia, Typography, TextField } from '@material-ui/core';
import axios from 'axios';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { toFirstCharUppercase } from './constants';

const useStyles = makeStyles(theme => ({
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
  },
  searchContainer: {
    display: 'flex',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: '20px',
    paddingRight: '20px',
    marginTop: '5px',
    marginBottom: '5px',
  },
  searchIcon: {
    alignSelf: 'flex-end',
    marginBottom: '5px',
  },
  searchInput: {
    width: '200px',
    margin: '5px',
  }
}));

const Pokedex = props => {
  // Destructures props and allows for use of history
  const { history } = props;
  const classes = useStyles();

  // pokemonData is the getter
  // setPokemonData is the setter
  // useState(mockData) sets the mockData as the default state
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState('');

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

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
        <Toolbar>
          <div className={classes.searchContainer}>
            {/* Creates the search bar */}
            <SearchIcon className={classes.searchIcon} />
            <TextField
              onChange={handleSearchChange}
              className={classes.searchInput}
              label="Pokemon"
              variant='standard' />
          </div>
        </Toolbar>
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map((pokemonId) => 
          // Different way of doing an if statement
          // if pokemonData[pokemonId].name.includes(filter) is true, then getPokemonCard will run
          // includes() returns true or false
            pokemonData[pokemonId].name.includes(filter) &&
            getPokemonCard(pokemonId)
          )}
        </Grid>
        ) : (
          // Uses the circular progress while the pokemon data loads
        <CircularProgress />
      )}
    </>
  )
}

export default Pokedex