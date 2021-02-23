import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { toFirstCharUppercase } from './constants';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
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
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return(
      <>
      <center>
      <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image={fullImageUrl}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive 
        </Typography>
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
            Heat 1/2 .
          </Typography>
          <Typography paragraph>
            Heat oil
          </Typography>
          <Typography paragraph>
            Add rice
          </Typography>
          <Typography>
            Set aside
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
        <Typography variant='h1'>
          {`${id}.`} {toFirstCharUppercase(name)}
          <img src={front_default} />
        </Typography>
        <img style={{width:'300px', height: '300px'}} src={fullImageUrl} alt={`Selected Pokemon`}/>
        <Typography variant='h3'>Pokemon Info</Typography>
        <Typography>
          {'Species: '}
          <Link href={species.url}>{species.name}</Link>
        </Typography>
        <Typography>Height: {height}</Typography>
        <Typography>Weight: {weight}</Typography>
        <Typography variant='h6'>Types: </Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return <Typography key={name}>{`${name}`}</Typography>;
        })}
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
        <Button variant='contained' onClick={() => history.push('/')}>
          Back to Pokedex
        </Button>
      </center>
    )}
   </div>
  );
}

export default Pokemon