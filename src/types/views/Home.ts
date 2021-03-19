import { IItem } from '@/types/store/menu'

export interface IHomeState {
  inputValue: string
  filteredItems: Array<IItem>
}
