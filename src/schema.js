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

const findById = (id) => (item) => id === item.id

class VegitableModel {
	find() {
		return db.vegitables
	}

	findOne({ id }) {
		return db.vegitables.find(findById(id))
	}

	create(args) {
		const id = String(Math.random())
		const vegi = { ...args, id }
		db.vegitables.push(vegi)
		return vegi
	}
}

class FruitModel {
	find() {
		return db.fruits
	}

	findOne({ id }) {
		return db.fruits.find(findById(id))
	}

	create(args) {
		const id = String(Math.random())
		const fruit = { ...args, id }
		db.fruits.push(fruit)
		return fruit
	}

	update({ data, where: { id } }) {
		const indexOfFruit = db.fruits.findIndex((item) => item.id === id)
		const fruit = { ...db.fruits[indexOfFruit], ...data }

		db.fruits = [
			...db.fruits.splice(0, indexOfFruit),
			fruit,
			...db.fruits.splice(indexOfFruit + 1)
    ]
		return fruit
	}
}

const models = { vegitable: new VegitableModel(), fruit: new FruitModel() }

class DbDirevtive extends SchemaDirectiveVisitor {
	visitSchema(schema) {
		// console.log('\n\n LOLOLOLO visitSchema args', schema)
	}
	visitInputObject(...args) {
		// console.log('\n\n inputobj', this)
	}
	visitFieldDefinition(field) {
		const [ model, method ] = this.args.call.split('.')

		field.resolve = (root, args, context) => {
			return models[model][method](args)
		}
	}
}

const typeDefs = `
  directive @db(call: String) on FIELD_DEFINITION | INPUT_OBJECT | SCHEMA

  schema @db {
    query: Query
    mutation: Mutation
  }

  type Query {
    fruits: [Fruit] @db(call: "fruit.find")
    fruit(id: ID!): Fruit @db(call: "fruit.findOne")

    vegitables: [Vegitable] @db(call: "vegitable.find")
    vegitable(id: ID!): Vegitable @db(call: "vegitable.findOne")
  }

  type Mutation {
    createFruit(name: String): Fruit @db(call: "fruit.create")
    updateFruit(data: FruitDataInput!, where: FruitWhereUniqueInput!): Fruit @db(call: "fruit.update")

    createVegitable(name: String): Vegitable @db(call: "vegitable.create")
  }

  type Fruit {
    id: ID
    name: String
  }

  input FruitInput {
    id: ID
  }

  input FruitDataInput {
    name: String
  }

  input FruitWhereUniqueInput {
    id: ID
  }

  type Vegitable {
    id: ID
    name: String
  }
`

const resolvers = {
	Query: {
		// fruits: () => {
		//   console.log('yo yo yo')
		//   return db.fruits
		// },
		// vegitables: () => {
		//   console.log('no no no')
		//   return db.vegitables
		// }
		// fruit: (_, args) => {
		//   console.log('RESOLVER')
		//   console.log('args', args)
		//   return models.vegitables.findOne()}
	}
}

export const schema = makeExecutableSchema({
	typeDefs,
	resolvers
	// schemaDirectives: {
	// 	db: DbDirevtive
	// }
})

SchemaDirectiveVisitor.visitSchemaDirectives(schema, {
	db: DbDirevtive
})

export const binding = new Binding({ schema })

export function context(headers, secrets) {
	return {
		headers,
		secrets,
		models
	}
}
