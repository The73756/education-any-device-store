import './index.css'
import { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { BasketStore } from './store/basket-store'
import { DeviceStore } from './store/device-store'
import { OrderStore } from './store/order-store'
import { RatingStore } from './store/rating-store'
import { UserStore } from './store/user-store'

export const Context = createContext(null)

ReactDOM.createRoot(document.querySelector('#root')).render(
  <Context.Provider
    value={{
      user: new UserStore(),
      device: new DeviceStore(),
      basket: new BasketStore(),
      rating: new RatingStore(),
      order: new OrderStore(),
    }}
  >
    <App />
  </Context.Provider>,
)
