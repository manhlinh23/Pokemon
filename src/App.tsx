import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import PokemonCollections from './components/PokemonCollections'
import { Pokemons,Pokemon, ViewDetail } from './interface';


const App = () => {
  const [pokemon,setPokemon] = useState<Pokemon[]>([])
  const [nexUrl,setNextUrl] = useState<string>("")
  const [loading,setLoading] = useState<boolean>(true)
  const [viewDetail,setViewDetail] = useState<ViewDetail>({
    id:0,
    isOpen:false
  })
  useEffect(()=>{
    const getPokemon = async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10&offset=10')
      setNextUrl(res.data.next)
      let pokemons = res.data.results
      pokemons.forEach(async(e:Pokemons) => {
       const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${e.name}`)
        setPokemon((e)=> [...e,poke.data])
        setLoading(false)
      })
    }
    getPokemon()
  },[])

  console.log(pokemon);
  
  const loadMore = async() => {
    setLoading(true)
    const res = await axios.get(nexUrl)
    setNextUrl(res.data.next)
    let pokemons = res.data.results
    pokemons.forEach(async(e:Pokemons) => {
     const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${e.name}`)
      setPokemon((e)=> [...e,poke.data])
      setLoading(false)
    })
  }

  return (
    <>
    <div className="container">
      <header className='header'>Pokémon</header>
      <PokemonCollections pokemons={pokemon} viewDetail={viewDetail} setViewDetail={setViewDetail} />
      {loading ? <div style={{width:'100%',textAlign:'center'}}>Loading...</div> : null}
      <div>
        {viewDetail.isOpen ? null : <div className='btn_more' style={{width:'100%',textAlign:'center',cursor:'pointer'}} onClick={loadMore}><i className="material-icons">expand_more</i></div>}
      </div>
    </div>
    </>
  )
}

export default App
