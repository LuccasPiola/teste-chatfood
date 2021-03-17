export default interface IMenuAPI {
  categories: Array<ICategorie>
  items: Array<IItem>
}

interface ICategorie {
  id: string
  name: string
  url: string
}

export interface IItem {
  id: string
  name: string
  url: string
  price: number
  discount_rate: number
  stock: {
    availability: number
  }
  description: string
  photo: string
  category_id: string
}
