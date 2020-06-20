
import React from 'react';
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

const consultarPokemon = gql`
  query consultaPokemon($nombre: String){
    pokemon(name: $nombre) {
      name
      image
      weaknesses
      attacks {
        special {
          name
        }
      }
    }
  }`

const CardPokemon = (props) => {
  console.log(props.data.pokemon)
  const datos = props.data.pokemon || null
  const attacks = datos !== null ? datos.attacks.special : null
  console.log(attacks)

  return (
    <div className="m-auto border-2 border-solid border-gray-300 card-pokemon p-2">
        <div className="flex flex-col items-center">
        {datos === null ? <p className="text-center text-2xl font-semibold mt-24 p-5">Selecciona tu Pokemón para ver sus principales características</p> :
          <>
            <p className="text-center text-xl font-semibold">{datos.name}</p>
            <div className="mx-auto mt-5" style={{height: '200px'}}>
              <img style={{height: '200px'}} alt="imagen pokemon" src={datos === undefined ? '' : datos.image} />
            </div>
            <div className="text-center mt-6">
              <p className="text-lg">Ataques</p>
              <div className="flex flex-row justify-around">
                {attacks.map((elem)  =>{
                  return <p className="font-bold mr-4">{elem.name}</p>
                })}
              </div>
              <p className="text-lgmt-6">Débil contra:</p>
              <div className="flex flex-row justify-around">
                {datos.weaknesses.map((elem)  =>{
                  return <p className="font-bold mr-4">{elem}</p>
                })}
              </div>
            </div>
          </>
        }
      </div>
    </div>
  );

}

export default graphql(consultarPokemon)(CardPokemon);