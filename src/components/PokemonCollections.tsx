import React from 'react'
import { PokemonDetail,ViewDetail } from '../interface'
import PokemonList from './PokemonList'
import '../css/PokemonCollections.css'

interface Props {
    pokemons: PokemonDetail[]
    viewDetail: ViewDetail,
    setViewDetail: React.Dispatch<React.SetStateAction<ViewDetail>>
}

const PokemonCollections:React.FC<Props> = (props) => {
    const {pokemons,viewDetail,setViewDetail} = props
    const selectedPokemon = (id:number) =>{
        if(!viewDetail.isOpen){
            setViewDetail({
                id:id,
                isOpen:true
            }) 
        }
    }
  return (
    <>
        <section className={viewDetail.isOpen ? "collection-container-active" : 'collection-container'}>
            {viewDetail.isOpen ? (<div className='overlay'/>) : null}
            {pokemons.map((item,index)=>(
                <div onClick={() => selectedPokemon(item.id)}>
                    <PokemonList
                    key={index}
                    name= {item.name}
                    image = {item.sprites.front_default}
                    id={item.id}
                    abilities={item.abilities}
                    viewDetail={viewDetail}
                    setViewDetail={setViewDetail}
                    />
                </div>
            ))}
        </section>
    </>
  )
}

export default PokemonCollections