import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, CircularProgress, Container, Button, Box } from "@mui/material";

const Pokemon = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const [pokemonSelect, setPokemonSelect] = useState(null); 

    useEffect(() => {
        const getPokemons = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
                if (!response.ok) {
                    throw new Error("Error fetching Pokemons");
                }
                const data = await response.json();
                setPokemons(data.results);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        getPokemons();
    }, []);

    const fetchDetailPokemon = async (id) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
            if (!response.ok) {
                throw new Error("Error fetching Pokemon details");
            }
            const data = await response.json();
            setPokemonSelect(data);
        } catch (error) {
            setError(error);
        }
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography variant="h5" color="error">{error.message}</Typography>;
    }

    return (
        <div>
            <Box sx={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'purple' }}>
                <Container fixed backgroundColor="grey">
                    <Typography variant="h2" component="div" color={"white"}>Pokemon Detail</Typography>
                    {pokemonSelect && (
                        <div>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" component="div">Name: {capitalizeFirstLetter(pokemonSelect.name)}.</Typography>
                                    <img src={pokemonSelect.sprites.front_default} alt={pokemonSelect.name} />
                                    <Typography variant="h6" component="div">Type: <b>{capitalizeFirstLetter(pokemonSelect.types[0].type.name)}</b></Typography>
                                    {pokemonSelect.types.length > 1 && (
                                        <Typography variant="h6" component="div">Type 2: <b>{capitalizeFirstLetter(pokemonSelect.types[1].type.name)}</b></Typography>
                                    )}
                                    <Typography variant="h6" component="div">Height: <b>{pokemonSelect.height}</b></Typography>
                                    <Typography variant="h6" component="div">Weight: <b>{pokemonSelect.weight}</b></Typography>
                                    <Typography variant="h6" component="div">Pokedex No: <b>{pokemonSelect.id}</b></Typography>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </Container>
            </Box>
            <Box backgroundColor={"purple"}>
            <Container>
                <Typography variant="h2" component="div" color={"white"}>Pokemon List</Typography>
                <Grid container spacing={2}>
                    {pokemons.map((pokemon, index) => (
                        <Grid item xs={4} key={index}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h4" component="div">{capitalizeFirstLetter(pokemon.name)}</Typography>
                                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} />
                                    <Button color="secondary" variant="contained" onClick={() => fetchDetailPokemon(index + 1)}>Select</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            </Box>
        </div>
    );
};

export default Pokemon;