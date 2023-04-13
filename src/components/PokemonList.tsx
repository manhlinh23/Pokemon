import React, { useEffect, useState } from 'react'
import '../css/PokemonList.css'
import {ViewDetail} from '../interface'

interface Props {
    viewDetail: ViewDetail,
    setViewDetail: React.Dispatch<React.SetStateAction<ViewDetail>>
    abilities?:{
        ability:string,
        name:string
    }[] | undefined
    id:number,
    name:string,
    image:string,
}

const PokemonList:React.FC<Props> = (props) => {
    const {name,image,id,abilities,viewDetail,setViewDetail} = props
    const [isSelected,setIsSelected] = useState<boolean>(false)

    useEffect(()=>{
        setIsSelected(id === viewDetail?.id)
    },[viewDetail])

    const _handleClose = () => {
        setViewDetail({
            id: 0,
            isOpen:false
        })
        setIsSelected(false)
    }


    console.log(abilities);
    
  return (
    <>
        {isSelected ? (
            <section className='pokemon-list-detail' onClick={()=>_handleClose()}>
                <div className="detail-contianer" >
                    <div className="detail-info">
                        <div className="detail-name">{name}</div>
                        <img src={image} alt="" />
                    </div>
                    <div className="detail-abilities">      
                    <p>Abilities:</p>  
                    {abilities?.map((item:any,index)=>(
                    <p key={index}>- {item.ability.name}</p>
        ))}         </div>
                </div>
            </section>
        ):
        (           
            <section className="pokemon-list-container">
            <p className='pokemon-name'>{name}</p>
            <img className='pokemon-img' src={image} alt="" />
        </section>
        )
        }

    </>
  )
}

export default PokemonList