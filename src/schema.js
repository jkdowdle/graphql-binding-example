import { makeExecutableSchema, SchemaDirectiveVisitor } from 'graphql-tools'
import { Binding } from 'graphql-binding'

const vegitable = [
	{
		id: 'a',
		name: 'Carrot'
	},
	{
		id: 'b',
		name: 'Cellary'
	}
]

const fruit = [
	{
		id: 'c',
		name: 'Apple'
	},
	{
		id: 'd',
		name: 'Orange'
	}
]

const db = { vegitable, fruit }

const findById = (id) => (item) => id === item.id

const operations = {
	find: (type) => () => db[type],
	findOne: (type) => ({ id }) => db[type].find(findById(id)),
	create: (type) => (args) => {
		const id = String(Math.random())
		const item = { ...args, id }
		db[type] = [
			...db[type],
			item
		]
		return item
	},
	update: (type) => ({ data, where: { id } }) => {
		const indexOfItem = db[type].findIndex(findById(id))
		const item = { ...db[type][indexOfItem], ...data }

		db[type] = [
			...db[type].slice(0, indexOfItem),
			item,
			...db[type].slice(indexOfItem + 1)
		]
		return item
	},
	remove: (type) => ({ where: { id } }) => {
		const indexOfItem = db[type].findIndex(findById(id))
		const item = db[type][indexOfItem]

		db[type] = [
			...db[type].slice(0, indexOfItem),
			...db[type].slice(indexOfItem + 1)
		]
		return item
	}
}

class DbDirevtive extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		// Determine from schema directive what type and operation
		const [ type, method ] = this.args.call.split('.')

		// Select the method. example: operations.create
		const operation = operations[method]

		// Pass in the type operation should be performed on
		const operationOnType = operation(type)

		field.resolve = (root, args, context) => {
			// Pass on arguments to operation
			return operationOnType(args)
		}
	}
}

const typeDefs = `
  directive @db(call: String) on FIELD_DEFINITION

  type Query {
    fruits: [Fruit] @db(call: "fruit.find")
    fruit(id: ID!): Fruit @db(call: "fruit.findOne")

    vegitables: [Vegitable] @db(call: "vegitable.find")
    vegitable(id: ID!): Vegitable @db(call: "vegitable.findOne")
  }

  type Mutation {
    createFruit(name: String): Fruit @db(call: "fruit.create")
		updateFruit(data: FruitDataInput!, where: FruitWhereUniqueInput!): Fruit @db(call: "fruit.update")
		removeFruit(where: FruitWhereUniqueInput): Fruit @db(call: "fruit.remove")

		createVegitable(name: String): Vegitable @db(call: "vegitable.create")
		updateVegitable(data: VegitableDataInput!, where: VegitableWhereUniqueInput!): Vegitable @db(call: "vegitable.update")
		removeVegitable(where: VegitableWhereUniqueInput): Vegitable @db(call: "vegitable.remove")
  }

  type Fruit {
    id: ID
    name: String
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

	input VegitableDataInput {
    name: String
  }

  input VegitableWhereUniqueInput {
    id: ID
  }
`

const resolvers = {
	Query: {

	},
	Mutation: {

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
		secrets,
		models
	}
}
