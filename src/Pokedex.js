import React, { useEffect, useState } from "react";
import clsx from 'clsx';
import { AppBar, Toolbar, Grid, Card, CardContent, CircularProgress, 
  CardMedia, Typography, TextField, Button } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
  },
  button: {
    margin: 'auto',
    display: 'flex', 
    alignItems: 'center', 
    justifyContent:'center'
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
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

const Pokedex = props => {
  // Destructures props and allows for use of history
  const { history } = props;
  const classes = useStyles();

  // pokemonData is the getter
  // setPokemonData is the setter
  // useState(mockData) sets the mockData as the default state
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState('');
  const [expanded, setExpanded] = React.useState(false);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  // useEffect with an [] is the same as componentDidMount
  useEffect(() => {
    // limited to 807 because sprite images on API only go to 807
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10`)
    .then(function(response) {
      const { data } = response;
      const { results } = data;
      console.log(`results are: ${data}`)
      const newPokemonData = {};
      results.forEach((pokemon, index) => {
        newPokemonData[index + 1] = {
          id: index + 1,
          name: pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        };
      });
      setPokemonData(newPokemonData);
    })
  }, [])
  
  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];
    
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    console.log(pokemonData[pokemonId])
    return(
    //   <Grid item xs={12} sm={4} ley={pokemonId}>
    //     {/* This on click pushes the /${pokemonId} into the url */}
    //     <Card onClick = {() => history.push(`/${pokemonId}`)}>
    //       <CardMedia
    //         className={classes.cardMedia}
    //         image={sprite}
    //         style={{width: '130px', height: '130px'}} />
    //       {/* using cardcontent helps with spacing */}
    //       <CardContent className={classes.cardContent}>
    //         <Typography>{`${id}.${toFirstCharUppercase(name)}`}</Typography>
    //       </CardContent>
    //     </Card>
    // </Grid>
    <Grid item xs={12} sm={4} ley={pokemonId} >
      <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar} >
            {pokemonId}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${toFirstCharUppercase(name)}`}
      />
      <CardMedia
        className={classes.cardMedia}
        image={sprite}
        style={{width: '130px', height: '130px'}}
      />
      <CardContent className={classes.button}>
        <Button 
          variant="contained"
          color="primary"
          onClick = {() => history.push(`/${pokemonId}`)}>
            Click to see Stats
          </Button>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
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