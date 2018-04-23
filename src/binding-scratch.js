import { binding } from './schema'

// Operations on fruit

binding.query.fruits().then(fruits => console.log(' \n fruits', fruits))

binding.query.fruit({ id: 'c' }).then(fruit => console.log(' \n fruit', fruit))

binding.mutation
  .createFruit({ name: 'Mango' })
  .then(fruit => console.log(' \n createFruit', fruit))

binding.mutation
  .updateFruit({ data: { name: 'Cool' }, where: { id: 'd' } })
  .then(fruit => console.log('\n updateFruit', fruit))

binding.mutation
  .removeFruit({
    where: { id: 'd' }
  })
  .then(fruit => console.log('\n removeFruit', fruit))

// Operations on vegitable

binding.query
  .vegitables()
  .then(vegitables => console.log(' \n vegitables', vegitables))

binding.query
  .vegitable({ id: 'a' })
  .then(vegitable => console.log(' \n vegitable', vegitable))

binding.mutation
  .createVegitable({ name: 'cucumber' })
  .then(vegitable => console.log(' \n createVegitable', vegitable))

binding.mutation
  .updateVegitable({ data: { name: 'Super Cellary' }, where: { id: 'b' } })
  .then(vegitable => console.log('\n updateVegitable', vegitable))

binding.mutation
  .removeVegitable({
    where: { id: 'b' }
  })
  .then(vegitable => console.log('\n removeVegitable', vegitable))
