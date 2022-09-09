import React from "react";
import { Router, NavLink, Routes, Route, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { DotLoader } from "react-spinners";
import { useEffect, useState } from "react";

const Fight = () => {
  const [fightState, setFightState] = useState({
    ownPid: 0,
    advPid: 0,
    ownPLife: 0,
    advPLife: 0,
    isMyTurn: true,
  });

  const params = useParams();

  const [pokeList, setPokeList] = useState();

  const fetchMyAPI = async () => {
    let response = await axios
      .get("https://pokefight-backend.onrender.com/pokemon/")
      .then((r) => {
        setPokeList(r);
        setPokemons(r);
        console.log("all pokemons as returned from render.com: ", r);
      });
  };
  useEffect(() => {
    fetchMyAPI();
  }, []);

  function setPokemons(pokeList) {
    console.log("setPokemons:", pokeList);
    console.log("params:", params);
    if (pokeList) {
      const newID = Math.floor(Math.random() * 809);
      const newPokemon = pokeList.data.find((pokemon) => pokemon.id === newID);

      const ourID = parseInt(params.id);
      const ourPokemon = pokeList.data.find((pokemon) => pokemon.id === ourID);
      console.log("this is our pokemon:", ourPokemon);
      setFightState({
        ownPid: ourPokemon,
        advPid: newPokemon,
        ownPLife: ourPokemon.base.hp,
        advPLife: newPokemon.base.hp,
        isMyTurn: true,
      });
    }
  }

  //   function attack() {
  //     if () {
  //       setFightState({
  //         ownPid: fightState.ownPid,
  //         advPid: fightState.advPid,
  //         ownPLife: fightState.ownPLife,
  //         advPLife: fightState.advPLife - fightState.ownPid.attack,
  //         isMyTurn: false,
  //       });
  //     } else {
  //       setFightState({
  //         ownPid: fightState.ownPid,
  //         advPid: fightState.advPid,
  //         ownPLife: fightState.ownPLife - fightState.advPid.attack,
  //         advPLife: fightState.advPLife,
  //         isMyTurn: true,
  //       });
  //     }
  //   }

  return (
    <div>
      {/* Our Pokemon */}
      <div>
        <img src={fightState?.ownPid?.pictureBack} alt="" />
        <h4>{fightState?.ownPid?.name?.english}</h4>
        <p>Attack: {fightState?.ownPid?.base?.Attack}</p>
        <p>Defense: {fightState?.ownPid?.base?.hp}</p>
        <Button onClick={attack()}> </Button>
      </div>

      {/* Enemy Pokemon  */}
      <div>
        <img src={fightState?.advPid?.pictureFront} alt="" />
        <h4>{fightState?.advPid?.name?.english}</h4>
        <p>Attack: {fightState?.advPid?.base?.Attack}</p>
        <p>Defense: {fightState?.advPid?.base?.hp}</p>
      </div>
    </div>
  );
};

export default Fight;
