
import React from 'react';
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

const miniPokemon = gql`
  query miniCardPokemon($nombre: String){
    pokemon(name: $nombre) {
      name
      image
    }
  }
`

const MiniCard = (props) => {
  const datos = props.data.pokemon || null

  return (
    <div className="h-20 w-22 m-3">
      {datos === null ?
        null
        : <div className="flex flex-col items-center">
            <p className="text-sm mb-3">{datos.name}</p>
            <img className="h-12" alt="imagen pokemon" src={datos === undefined ? '' : datos.image} />
          </div>
      }
    </div>
  );

}

export default graphql(miniPokemon)(MiniCard);