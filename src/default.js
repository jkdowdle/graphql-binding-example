export const query = `
  ### Fruits ###

  query Fruits {
    fruits {
      id
      name
    }
  }

  query Fruit($fruitId: ID!) {
    fruit(id: $fruitId) {
      id
      name
    }
  }

  mutation CreateFruit($fruitName: String!) {
    createFruit(name: $fruitName) {
      id
      name
    }
  }

  mutation UpdateFruit($fruitData: FruitDataInput!, $fruitUpdateWhere:FruitWhereUniqueInput!) {
    updateFruit(data: $fruitData, where: $fruitUpdateWhere) {
      id
      name
    }
  }

  mutation RemoveFruit($fruitRemoveWhere: FruitWhereUniqueInput!) {
    removeFruit(where: $fruitRemoveWhere) {
      id
      name
    }
  }

  ### Vegitables ###

  query Vegitables {
    vegitables {
      id
      name
    }
  }

  query Vegitable($vegitableId: ID!) {
    vegitable(id: $vegitableId) {
      id
      name
    }
  }

  mutation CreateVegitable($vegitableName: String!) {
    createVegitable(name: $vegitableName) {
      id
      name
    }
  }

  mutation UpdateVegitable($vegitableData: VegitableDataInput!, $vegitableUpdateWhere:VegitableWhereUniqueInput!) {
    updateVegitable(data: $vegitableData, where: $vegitableUpdateWhere) {
      id
      name
    }
  }

  mutation RemoveVegitable($vegitableRemoveWhere: VegitableWhereUniqueInput!) {
    removeVegitable(where: $vegitableRemoveWhere) {
      id
      name
    }
  }


`

export const vars = {
  "fruitId": "d",
  "fruitName": "Watermelon",
  "fruitData": {
    "name": "Super Apple"
  },
  "fruitUpdateWhere": {
    "id": "c"
  },
  "fruitRemoveWhere": {
    "id": "d"
  },
  "vegitableId": "b",
  "vegitableName": "Cucumber",
  "vegitableData": {
    "name": "Super Carrot"
  },
  "vegitableUpdateWhere": {
    "id": "a"
  },
  "vegitableRemoveWhere": {
    "id": "b"
  }
}
