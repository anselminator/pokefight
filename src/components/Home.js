import React from "react";
import { Router, NavLink, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokeList, setPokeList] = useState();

  const fetchMyAPI = async () => {
    let response = await axios
      .get("https://pokefight-backend.onrender.com/pokemon/")
      .then((r) => {
        setIsLoading(false);
        setPokeList(r);
        console.log("all pokemons as returned from render.com: ", r);
      });
    // let resp = response.json();
  };
  /*
  const fetchPokeSprites = () => {
    for (let i = 0; i < 809; i++) {
      //      let p = pokeList[i];
      //    let n = p.name;
      let response = axios
        .get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        .then((r) => {
          console.log("pokemons ", " looks like ", r.sprites.front_default);
        });
      // let resp = response.json();
    }
    
  };
*/
  useEffect(() => {
    setIsLoading(true);
    fetchMyAPI();
    //    fetchPokeSprites();
  }, []);

  if (isLoading) {
    return <h1> Gotta Load 'em All.........</h1>;
  } else {
    return (
      <div>
        <h1>Here's our Pokemon list</h1>
        {pokeList?.data?.map((e, i) => (
          <span key={i}>
            {" "}
            {e.name.english}
            <img
              src={`https://pokeapi.co/api/v2/pokemon/${e.name.english.toLowerCase}`}
            />
          </span>
        ))}
      </div>
    );
  }
};

export default Home;
