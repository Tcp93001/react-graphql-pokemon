import React, { Component } from 'react';
import CardPokemon from 'components/CardPokemon'
import MiniCard from 'components/MiniCard'

import Logo from 'assets/pokelogo.png'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      nombre: '',
      getData: true,
      pokemonList: [],
      offset: 0
    }
  }

  async componentDidMount() {
    const initialPokemon = await this.lookingForPokemons()
    console.log('valor inicial', initialPokemon)
    this.setState({ pokemonList: initialPokemon.results })
  }

  gettingName(data) {
    console.log('nombre', data)
    this.setState({nombre: data})
  }

  async lookingForPokemons() {
    console.log('looking', this.state.pokemonList)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${this.state.offset}&limit=10`)
    const list = await response.json()
    return list
  }

  cambioDeNombre = (event) => {
    this.setState({
      nombre: event.target.value,
      getData: true
    })
  }

  changeList = async (event) => {
    console.log(event)
    const valorOffset = event.target.name === 'avanzar' ? 10 : -10
    await this.setState({offset: this.state.offset + valorOffset})
    console.log(this.state.offset)
    const nuevaLista = await this.lookingForPokemons()
    this.setState({pokemonList: nuevaLista.results})
  }

  render() {
    const list = this.state.pokemonList
    console.log('this.state.nombre', this.state.nombre)
    return (
      <div>
        <header className="bg-pokeColor h-32">
          <div className="py-4" >
            <img className="ml-auto mr-20" src={Logo} alt="pokemon logo"/>
          </div>
        </header>
        <section className="container mx-auto px-10">
          <div className="flex flex-row justify-center items-center">
            <button className={`h-10 text-white font-bold py-2 mr-5 px-4 rounded ${this.state.offset === 0 ? `bg-gray-400` : `bg-blue-500 hover:bg-blue-700 `}`} name="regresar" disabled={this.state.offset === 0} onClick={(event) => this.changeList(event)}>Atras</button>
            <div className="flex flex-row justify-between items-center" style={{width: '1000px'}}>
              {list.map((elem, index) => {
                return (
                  <div onClick={() => this.gettingName(elem.name)} key={index}>
                    <MiniCard nombre={elem.name} />
                  </div>
                )
              })}
            </div>
            <button className="h-10 ml-5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" name="avanzar" onClick={(event) => this.changeList(event)}>Avanzar</button>
          </div>
        </section>
        <section>
          <div>
            <CardPokemon nombre={this.state.nombre} />
          </div>
        </section>
        <footer>

        </footer>
      </div>
    )
  }
}
