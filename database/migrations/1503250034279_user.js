'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).unique().notNullable()
      table.string('email', 254).unique().notNullable()
      table.string('password', 60).notNullable('true')
      // table.integer('category_id')
      // .unsigned()
      // .references('id')
      // .inTable('categories')
      // .onDelete('CASCADE')
      // .onUpdate('CASCADE');
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
