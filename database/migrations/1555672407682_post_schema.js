'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.string('name',255).notNullable().unique()
      table.string('description',255).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
