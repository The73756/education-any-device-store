import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { fetchTypes } from '@/api/deviceApi'
import { Context } from '@/main'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'

export const TypeBar = observer(({ close }) => {
  const { device } = useContext(Context)

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data))
  }, [])

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      className="flex flex-col"
      onValueChange={(type) => {
        device.setSelectedType(type)
        if (close) close()
      }}
      defaultValue={device.selectedType}
      value={device.selectedType}
    >
      {device.types.map((type) => (
        <ToggleGroupItem
          key={type.id}
          className="justify-start py-2 w-full h-auto min-h-10 text-left"
          value={type.id}
        >
          {type.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
})
