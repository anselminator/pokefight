import React from "react";
import { Router, NavLink, Routes, Route, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { DotLoader } from "react-spinners";
import { useEffect, useState } from "react";

const Pokemon = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState();
  const params = useParams();

  console.log("Displaying pokeomn ", params);
  const fetchMyAPI = async () => {
    let response = await axios
      .get(`https://pokefight-backend.onrender.com/pokemon/${params.id}`)
      .then((r) => {
        setIsLoading(false);
        console.log("single pokemons as returned from backend ", r.data);
        setPokemon(r.data);
      });
    // let resp = response.json();
  };
  useEffect(() => {
    setIsLoading(true);
    fetchMyAPI();
  }, []);

  if (isLoading) {
    return (
      <>
        <h1> Gotta Load a single one.........</h1>
        <DotLoader />
      </>
    );
  } else {
    return (
      <div>
        <h2>
          Here's Pokemon {params.id}, {pokemon?.name?.english}{" "}
        </h2>
        <img src={pokemon?.pictureBack} alt="" />
        <img src={pokemon?.pictureFront} alt="" />
        &nbsp;{pokemon.name.french}
        &nbsp;{pokemon.name.japanese}
        &nbsp;Type: {pokemon.type[0]} &nbsp; HP: {pokemon.base.HP}
        &nbsp; Attach: {pokemon.base.Attack}
        &nbsp;Defense: {pokemon.base.Defense}
        <Button variant="outlined"> I choose you....</Button>
      </div>
    );
  }
};

export default Pokemon;
