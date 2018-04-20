import { makeExecutableSchema, SchemaDirectiveVisitor } from 'graphql-tools'
import { Binding } from 'graphql-binding'

const vegitables = [
  {
    id: 'a',
    name: 'Carrot'
  },
  {
    id: 'b',
    name: 'Cellary'
  }
]

const fruits = [
  {
    id: 'c',
    name: 'Apple'
  },
  {
    id: 'd',
    name: 'Orange'
  }
]

const db = { vegitables, fruits }

class VegitableModel {
  constructor() {
    this.ready = true
  }
  find() {
    return db.vegitables
  }

  findOne() {
    return db.vegitables[0]
  }
}

class FruitModel {
  constructor() {
    this.ready = true
  }
  find() {
    return db.fruit
  }

  findOne() {
    return db.fruit[0]
  }
}

const models = { vegitables: new VegitableModel(), fruits: new FruitModel() }

console.log('VM', new VegitableModel())

class DbDirevtive extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { topic, request } = this.args
    // console.log('running', models)
    field.resolve = () => models[topic][request]

  }
}

const typeDefs = `
  directive @db(topic: String, request: String) on FIELD_DEFINITION

  type Query {
    fruits: [Fruit] @db(topic: "fruits", request: "find")
    vegitables: [Vegitable] @db(topic: "vegitables", request: "find")

    fruit: Fruit @db(topic: "fruits", request: "findOne")
    vegitable: Vegitable @db(topic: "vegitables", request: "findOne")
  }

  type Fruit {
    id: ID
    name: String
  }

  type Vegitable {
    id: ID
    name: String
  }
`

const resolvers = {
  Query: {
    fruits: () => {
      console.log('yo yo yo')
      return db.fruits
    },
    vegitables: () => {
      console.log('no no no')
      return db.vegitables
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    db: DbDirevtive
  }
})

export const binding = new Binding({ schema })

export function context(headers, secrets) {
  return {
    headers,
    secrets
  }
}
