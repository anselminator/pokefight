import React from "react";
import { Router, NavLink, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { DotLoader } from "react-spinners";
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
  };
  useEffect(() => {
    setIsLoading(true);
    fetchMyAPI();
    //    fetchPokeSprites();
  }, []);

  if (isLoading) {
    return (
      <>
        <h1> Gotta Load 'em All.........</h1>
        <DotLoader />
      </>
    );
  } else {
    return (
      <div>
        <h1>Here's our Pokemon list</h1>
        {pokeList?.data?.map((e, i) => (
          <NavLink to={`/pokemon/${e.id}`} key={i}>
            <Button variant="outlined" key={i}>
              <span key={i}>
                {e.id} {e.name.english}
                <img alt="" src={e.pictureFront} />
              </span>
            </Button>
          </NavLink>
        ))}
      </div>
    );
  }
};

export default Home;
