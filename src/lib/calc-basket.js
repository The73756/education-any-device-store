export const calcTotalBasketPrice = (devices) => {
  const totalPrice = devices.reduce(
    (total, basketDevice) =>
      total + basketDevice.device?.price * basketDevice.count,
    0,
  )
  return totalPrice
}

export const calcTotalBasketCount = (devices) => {
  return devices.reduce((total, device) => total + device.count, 0)
}
