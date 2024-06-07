import React, {useState, useEffect} from "react";
import {Grid, Card,CardContent,Typography,CircularProgress,Container,CardActionArea, Button} from "@mui/material";


const Pokemon = () => {

    const [pokemones,setPokemones] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);//aqui es null porque vamos a manejar el error y el error es un objeto
    const [pokemonSeleccionado,setPokemonSeleccionado] = useState(null);//aqui es null porque vamos a manejar el error y el error es un objeto

    useEffect(()=>{

        const traerPokemones = async()=>{
            const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
            if(!respuesta.ok){
                console.log("Ocurrió un error");
            }else{
                const data = await respuesta.json();
                setPokemones(data.results);
                console.log(data.results);
            }
        }

        traerPokemones();

    },[]);

    const fetchDetallePokemon = async(id)=>{
        //` Backtick 
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        if(!respuesta.ok){
            console.log("Ocurrió un error");
        }else{
            const data = await respuesta.json();
            setPokemonSeleccionado(data);
            console.log(data);
        }

    };

    return(
        <div>
            <h1>Lista de pokemones</h1>
            <ul>
                {pokemones.map((pokemon,index)=>(
                    <li key={index}>
                        {pokemon.name}
                        <Button variant="contained" onClick={()=>fetchDetallePokemon(index+1)}>Seleccionar pokemon</Button>
                    </li>
                ))}
            </ul>
            <hr/>
            <Typography variant="h3">Detalle de pokemon</Typography>
            
            {/* ESTE ELEMENTO APARECE SOLAMENTE CUANDO pokemonSeleccionado ES DIFERENTE A NULL */}
            <Container>
            {pokemonSeleccionado && 
                <div>
                
                    <Card>
                        <CardContent>
                        <Typography variant="h5" component="div">Nombre: {pokemonSeleccionado.name}</Typography>
                        <img src={pokemonSeleccionado.sprites.front_default}/>
                        <p>Altura: {pokemonSeleccionado.height} </p>
                        <p>Peso: {pokemonSeleccionado.weight} </p>
                        </CardContent>
                    </Card>         
                
                </div>
            }  
            </Container>
   

            
        </div>
    )

};

export default Pokemon;