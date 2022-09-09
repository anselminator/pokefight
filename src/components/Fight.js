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
        ownPLife: ourPokemon.base.HP,
        advPLife: newPokemon.base.HP,
        isMyTurn: true,
      });
    }
  }

  function attack() {
    const die1 = Math.floor(10 * Math.random()) + 1;
    const die2 = Math.floor(10 * Math.random()) + 1;
    console.log("fight ", die1);

    // if((fightState.advPLife - fightState.ownPid.base.Attack) <= 0){
    //   //gewonnen
    // }else{
    //   const result = fightState.advPLife - fightState.ownPid.base.Attack;
    //   setFightState((p) => ({
    //     ...p,
    //     ownPLife: result,
    //     advPLife: result,
    //   }));
    // }

    const result = fightState.advPLife - fightState.ownPid.base.Attack / die1;
    const result2 = fightState.ownPLife - fightState.advPid.base.Attack / die2;
    console.log(result, result2);

    setFightState((p) => ({
      ...p,
      ownPLife: result2,
      advPLife: result,
    }));

    //    const result = fightState.advPid.base.HP - fightState.ownPid.base.Attack;
  }

  if (fightState.ownPLife <= 0) {
    // our pokemon died
    return (
      <div>
        <img src={fightState?.advPid?.pictureFront} alt="" />
        <NavLink to="/">
          <h4>has WON</h4>
        </NavLink>
      </div>
    );
  } else if (fightState.advPLife <= 0) {
    // enemy died
    return (
      <div>
        <img src={fightState?.ownPid?.pictureFront} alt="" />
        <NavLink to="/">
          <h4>has WON</h4>
        </NavLink>
      </div>
    );
  }
  return (
    <div>
      {/* Our Pokemon */}
      <div>
        <img src={fightState?.ownPid?.pictureBack} alt="" />
        <h4>{fightState?.ownPid?.name?.english}</h4>
        <p>Attack: {fightState?.ownPid?.base?.Attack}</p>
        <p>Defense: {fightState?.ownPid?.base?.Defense}</p>
        <h4>HP: {fightState?.ownPLife}</h4>
        <Button onClick={attack}>Attack </Button>
      </div>

      {/* Enemy Pokemon  */}
      <div>
        <img src={fightState?.advPid?.pictureFront} alt="" />
        <h4>{fightState?.advPid?.name?.english}</h4>
        <p>Attack: {fightState?.advPid?.base?.Attack}</p>
        <p>Defense: {fightState?.advPid?.base?.Defense}</p>
        <h4>HP: {fightState?.advPLife}</h4>
      </div>
    </div>
  );
};

export default Fight;
