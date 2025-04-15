import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCard } from "./PokemonCard";
export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const API = "https://pokeapi.co/api/v2/pokemon?limit=50";
  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      // console.log("total pokemons: ",data)
      const detailedPokemonData = data.results.map(async (currPokemon) => {
        // console.log(currPokemon.url)
        try {
          const res = await fetch(currPokemon.url);
          const data = await res.json();
          // console.log("URLS: ",data)
          return data;
        } catch (error) {
          setError(error);
        }
      });
      // console.log("detailedPokemonData: ",detailedPokemonData)
      const detailedRespones = await Promise.all(detailedPokemonData);
      console.log("detailed Respons: ", detailedRespones);
      setPokemon(detailedRespones);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPokemon();
  }, []);
  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );
  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1>Error: {error.message}</h1>
      </div>
    );
  }
  return (
    <>
      <section className="container">
        <header>
          <h1>Lets catch pokemon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <ul className="cards">
            {searchData.map((curPokemon) => {
              return (
                <PokemonCard key={curPokemon.id} curPokemon={curPokemon} />
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};
