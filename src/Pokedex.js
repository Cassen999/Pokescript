import React, { useState } from "react";
import { AppBar, Toolbar, Grid, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import mockData from './MockData';

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
            <Card>
                {/* using cardcontent helps with spacing */}
                <CardContent>hi</CardContent>
            </Card>
        </Grid>
    )
}

const Pokedex = () => {
    const classes = useStyles();
    // pokemonData is the getter
    // setPokemonData is the setter
    // useState(mockData) sets the mockData as the default state
    const [pokemonData, setPokemonData] = useState(mockData);
    return(
        <>
            <AppBar position="static">
                <Toolbar />
            </AppBar>
            <Grid container spacing={2} className={classes.pokedexContainer}>
                    {getPokemonCard()}
                    {getPokemonCard()}
                    {getPokemonCard()}
                    {getPokemonCard()}
                    {getPokemonCard()}
            </Grid>
        </>
    )
}

export default Pokedex