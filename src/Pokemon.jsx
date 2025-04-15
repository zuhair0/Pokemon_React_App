import { useEffect, useState } from "react"
import "./index.css"
export const Pokemon =()=>{
    const [pokemon, setPokemon]=useState([])
    const [loading, setLoading]=useState(true)
    const [error, setError] = useState("")
    const API = "https://pokeapi.co/api/v2/pokemon?limit=50"
    const fetchPokemon= async ()=>{
        try {
            const res = await fetch(API)
            const data = await res.json()
            // console.log("total pokemons: ",data)
            const detailedPokemonData=data.results.map( async(currPokemon)=>{
                // console.log(currPokemon.url)
                try {
                    const res = await fetch(currPokemon.url)
                    const data = await res.json()
                    // console.log("URLS: ",data)
                    return data;
                } catch (error) {
                    setError(error)
                }
            })
            // console.log("detailedPokemonData: ",detailedPokemonData)
            const detailedRespones = await Promise.all(detailedPokemonData)
            console.log("detailed Respons: ", detailedRespones)
            setPokemon(detailedRespones)
            setLoading(false)
        } catch (error) {
            setError(error);
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchPokemon()
    },[])
    return <>
        <section className="container">
            <header>
                <h1>Lets catch pokemon</h1>
            </header>
            <div>
                <ul className="cards">
                    {
                        pokemon.map((curPokemon)=>{
                            return <li key={curPokemon.id}>{curPokemon.name}</li>
                        })
                    }
                </ul>
            </div>
        </section>
    </>
}