import { binding } from './schema'

binding.mutation.updateFruit({ data: { name: 'Cool' }, where: { id: 'd' } })
  .then(updatedFruit => console.log('\n\n updatedFruit', updatedFruit))
  // .then((fruit) => binding.query.fruits())
  // .then((fruits) => console.log(' \n fruits', fruits, '\n'))

  // binding.mutation.createFruit({ name: 'Mango' })
  // .then((fruit) => binding.query.fruits())
//   .then((fruits) => console.log(' \n fruits', fruits, '\n'))

// binding.query.fruits().then((fruits) => console.log(' \n fruits', fruits, '\n'))

// binding.query.fruit({ id: 'c' }).then((fruit) => console.log(' \n fruit', fruit, '\n'))

// //

// binding.mutation.createVegitable({ name: 'Brocolli' })
//   .then((vegi) => binding.query.vegitables())
//   .then((vegitables) => console.log(' \n vegies', vegitables, '\n'))

// binding.query.vegitables().then((vegitables) => console.log(' \n vegies', vegitables, '\n'))

// binding.query.vegitable({ id: 'a' }).then((vegitable) => console.log(' \n vegie', vegitable, '\n'))
