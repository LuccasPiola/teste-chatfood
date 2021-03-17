import { AxiosResponse } from 'axios'
import menuAPI from './menu'
import IMenuAPI from '../../types/api/menu'

export default {
  getMenu: (): Promise<AxiosResponse<IMenuAPI>> =>
    menuAPI.get<IMenuAPI>('/fe-code-challenge-1/menu.json'),
}
