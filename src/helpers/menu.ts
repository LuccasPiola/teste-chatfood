import { IItem, ICategorie } from '@/types/store/menu'

interface IProps {
  forThisCategories: ICategorie[]
  andItems: IItem[]
}

// This returns a matrix [i][j], where i are the categories, and j are the items in that category.
export const getItemsSeparatedByCategories = ({
  forThisCategories: categories,
  andItems: arrayOfItems,
}: IProps): Array<IItem[]> => {
  return categories.map(categorie => {
    return arrayOfItems.filter(item => item.category_id === categorie.id)
  })
}

// This gets the categories wich has at least one item that enters the filter.
export const getAvailableCategories = ({
  forThisCategories: categories,
  andItems: arrayOfItems,
}: IProps): ICategorie[] => {
  const categoriesIds = [...new Set(arrayOfItems.map(item => item.category_id))]
  return categories.filter(category => categoriesIds.includes(category.id))
}
