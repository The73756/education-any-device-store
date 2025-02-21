import { $authHost } from './index'

export const createBasketDevice = async (deviceId, basketId) => {
  const { data } = await $authHost.post('/api/basket', {
    deviceId,
    basketId,
  })
  return data
}

export const fetchBasketDevices = async (basketId) => {
  const { data } = await $authHost.get('/api/basket', {
    params: {
      basketId,
    },
  })
  return data
}

export const updateBasketDevice = async (device) => {
  const { data } = await $authHost.put('/api/basket', device)
  return data
}

export const deleteBasketDevice = async ({ id }) => {
  const { data } = await $authHost.delete('/api/basket', { params: { id } })
  return data
}
