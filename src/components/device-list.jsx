import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchDevices } from '@/api/deviceApi'
import { Context } from '@/main'
import { HOME_ROUTE } from '@/utils/consts'
import { DeviceItem } from './device-item'
import { NoProductsIcon } from './shared/no-products-icon'
import { Loader } from './ui/loader'

export const DeviceList = observer(() => {
  const { device } = useContext(Context)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    setLoading(true)
    fetchDevices({ page: 1, limit: device.limit })
      .then((data) => {
        device.setDevices(data.rows)
        device.setTotalCount(data.count)
        console.log(data.rows)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetchDevices({
      typeId: device.selectedType,
      brandId: device.selectedBrand,
      page: device.page,
      limit: device.limit,
      search: device.search,
      sort: device.sort,
      order: device.order,
    }).then((data) => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
      console.log(data.rows)
    })
  }, [
    device.selectedType,
    device.selectedBrand,
    device.page,
    device.limit,
    device.search,
    device.sort,
    device.order,
  ])

  useEffect(() => {
    device.resetFilters()
    fetchDevices({ page: 1, limit: device.limit }).then((data) => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [location.pathname])

  if (loading) {
    return <Loader />
  }

  if (device.devices.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 mt-20">
        <NoProductsIcon />
        <p className="text-center">Товары с выбранными фильтрами отсутствуют</p>
      </div>
    )
  }

  return (
    <div className="gap-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
      {device.devices.map((device) => (
        <DeviceItem key={device.id} device={device} />
      ))}
    </div>
  )
})
