import React from "react";
import { AppBar, Toolbar, Grid, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    pokedexContainer: {
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: '50px',
    }
})

const getPokemonCard = () => {
    return(
        <Grid item xs={12} sm={4}>
            <Card>hi</Card>
        </Grid>
    )
}

const Pokedex = () => {
    const classes = useStyles();
    return(
        <>
        <AppBar position="static">
            <Toolbar />
        </AppBar>
        <Grid container spacing={2} className={classes.pokedexContainer}>
            <Grid item xs={4}>
                {getPokemonCard()}
            </Grid>
        </Grid>
        </>
    )
}

export default Pokedex