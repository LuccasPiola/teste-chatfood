export default interface IMenuState {
  data: {
    categories: Array<ICategorie>
    items: Array<IItem>
  } | null
  isLoading: boolean
  hasError: boolean
}

interface ICategorie {
  id: string
  name: string
  url: string
}

interface IItem {
  id: string
  name: string
  url: string
  price: number
  discount_rate: number
  stock: {
    availability: number
  }
  description: string
  photo: string | null
  category_id: string
}

export type IFilterItems = (categoryId: string) => Array<IItem>
