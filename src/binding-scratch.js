import { binding } from './schema'

binding.query.fruits()
  .then(fruits => console.log(' \n fruits', fruits, '\n'))

binding.query.vegitables()
  .then(vegitables => console.log(' \n vegies', vegitables, '\n'))
