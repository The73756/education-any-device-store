export const createOrder = (data, userId) => {
  const prevOrders = JSON.parse(localStorage.getItem('orders'))

  if (prevOrders) {
    const userOrders = prevOrders.find((order) => order.userId === userId)

    if (userOrders) {
      userOrders.userOrders.push(data)
    } else {
      prevOrders.push({ userId, userOrders: [{ ...data }] })
    }

    localStorage.setItem('orders', JSON.stringify(prevOrders))
  } else {
    localStorage.setItem(
      'orders',
      JSON.stringify([{ userId, userOrders: [{ ...data }] }]),
    )
  }
}
