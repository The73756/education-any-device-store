import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { fetchBrands, fetchDevices, fetchTypes } from '@/api/deviceApi'
import { AddBrandForm } from '@/components/add-brand-form'
import { AddDeviceForm } from '@/components/add-device-form'
import { AddTypeForm } from '@/components/add-type-form'
import { AdminModal } from '@/components/admin-modal'
import { DeleteBrandForm } from '@/components/delete-brand-form'
import { DeleteDeviceForm } from '@/components/delete-device-form'
import { DeleteTypeForm } from '@/components/delete-type-form'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/toaster'
import { Context } from '@/main'

export const Admin = observer(() => {
  const { device } = useContext(Context)

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data))
    fetchBrands().then((data) => device.setBrands(data))
    fetchDevices({}).then((data) => device.setDevices(data.rows))
  }, [])

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center gap-8 my-8 container">
        <div className="flex flex-col items-center gap-2 w-3/5 max-md:w-full">
          <AdminModal title="Добавить тип" form={<AddTypeForm />} />
          <AdminModal title="Добавить бренд" form={<AddBrandForm />} />
          <AdminModal title="Добавить устройство" form={<AddDeviceForm />} />
        </div>
        <div className="flex flex-col items-center gap-2 w-3/5 max-md:w-full">
          <AdminModal
            variant="destructive"
            title="Удалить тип"
            form={<DeleteTypeForm />}
          />
          <AdminModal
            variant="destructive"
            title="Удалить бренд"
            form={<DeleteBrandForm />}
          />
          <AdminModal
            variant="destructive"
            title="Удалить устройство"
            form={<DeleteDeviceForm />}
          />
        </div>
      </div>
      <Toaster duration={3000} />
    </div>
  )
})
