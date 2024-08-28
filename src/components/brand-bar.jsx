import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { fetchBrands } from '@/api/deviceApi'
import { Context } from '@/main'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'

export const BrandBar = observer(({ close }) => {
  const { device } = useContext(Context)

  useEffect(() => {
    fetchBrands().then((data) => device.setBrands(data))
  }, [])

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      className="flex flex-col"
      onValueChange={(brand) => {
        device.setSelectedBrand(brand)
        if (close) close()
      }}
      defaultValue={device.selectedBrand}
      value={device.selectedBrand}
    >
      {device.brands.map((brand) => (
        <ToggleGroupItem
          key={brand.id}
          className="justify-start py-2 w-full h-auto min-h-10 text-left"
          value={brand.id}
        >
          {brand.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
})
