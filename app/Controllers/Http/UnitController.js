'use strict'
const Pokemon = use('App/Models/Pokemon');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pokemons
 */
class PokemonController {

  async index ({ request, response, view }) {
    try {
      const pokemons = await Pokemon.all();

      return response.status(200).send({'data':pokemons})
    } catch (e) {
      return response.status(400).send({'message':'something went wrong!'})
    }
  }

  async store ({ request, response }) {
    try {
      const pokemonData = await request.all()

      const pokemon = await Pokemon.create(pokemonData);

      return response.status(201).send({'message':'success', 'data':pokemon})

    } catch (e) {
      return response.status(400).send({'message':'something went wrong!'})
    }
  }

  async show ({ params, request, response, view }) {
  }

  async edit ({ params, request, response, view }) {
    try {
      const { id } = await params
      const pokemonData = await request.all()

      const pokemon = await Pokemon.find(id);

      if(pokemon==null)
        return response.status(404).send({'message':'data not found'})

      await pokemon.merge(pokemonData);

      await pokemon.save()

      return response.status(200).send(pokemon)

    } catch (e) {
      return response.status(400).send({'message':'something went wrong!'})
    }
  }

  /**
   * Update pokemon details.
   * PUT or PATCH pokemons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a pokemon with id.
   * DELETE pokemons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PokemonController
