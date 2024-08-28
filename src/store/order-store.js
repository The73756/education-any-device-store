import { makeAutoObservable } from 'mobx'

export class OrderStore {
  constructor() {
    this._orders = []
    this._orderTotalCount = 0
    makeAutoObservable(this)
  }

  setOrders(orders) {
    this._orders = orders
    this.setOrderTotalCount(
      orders.reduce((total, order) => total + order.count, 0),
    )
  }

  setOrderTotalCount(count) {
    this._orderTotalCount = count
  }

  get orders() {
    return this._orders
  }

  get orderTotalCount() {
    return this._orderTotalCount
  }
}
