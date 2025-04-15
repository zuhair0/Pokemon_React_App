export const PokemonCard = ({ curPokemon }) => {
  return (
    <li key={curPokemon.id} className="pokemon-card">
      <figure>
        <img
          src={curPokemon.sprites.other.dream_world.front_default}
          alt={curPokemon.name}
          className="pokemon-image"
        />
      </figure>
      <h1>{curPokemon.name}</h1>
      <div className="pokemon-info pokemon-highlight">
        <p>
          {curPokemon.types
            .map((pokemonType) => pokemonType.type.name)
            .join(", ")}
        </p>
      </div>
      <div className="grid-three-cols">
        <p className="pokemon-info">
          <span>Height: </span>
          {curPokemon.height}
        </p>
        <p className="pokemon-info">
          <span>Weight: </span>
          {curPokemon.weight}
        </p>
        <p className="pokemon-info">
          <span>speed: </span>
          {curPokemon.stats[5].base_stat}
        </p>
      </div>

      <div className="grid-three-cols">
        <div className="pokemon-info">
            <p>{curPokemon.base_experience}</p>
            <span>Experience: </span>
        </div>
        <div className="pokemon-info">
            <p>{curPokemon.stats[1].base_stat}</p>
            <span>Attack: </span>
        </div>
      <div className="pokemon-info">
        <p>
          {curPokemon.abilities
            .map((abilityinfo) => abilityinfo.ability.name)
            .slice(0, 1)
            .join(", ")}
        </p>
        <span>Abilities: </span>
      </div>
      </div>
    </li>
  );
};
