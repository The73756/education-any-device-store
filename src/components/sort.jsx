import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { Context } from '@/main'
import { SORT } from '@/utils/consts'
import { BrandBar } from './brand-bar'
import { ArrowIcon } from './shared/arrow-icon'
import { TypeBar } from './type-bar'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Sheet, SheetContent } from './ui/sheet'
import { SheetTriggerButton } from './ui/sheet-trigger-button'

const options = [
  { value: SORT.RATING, label: 'По рейтингу' },
  { value: SORT.PRICE, label: 'По цене' },
  { value: SORT.NAME, label: 'По названию' },
  { value: SORT.TYPE, label: 'По типу' },
  { value: SORT.BRAND, label: 'По бренду' },
]

export const Sort = observer(() => {
  const { device } = useContext(Context)
  const [open, setOpen] = useState(false)

  return (
    <div className="flex max-sm:flex-wrap gap-4 max-sm:gap-2 w-1/2 max-md:w-auto">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTriggerButton className="md:hidden" variant="outline">
          Фильтры
        </SheetTriggerButton>
        <SheetContent side="left" className="flex flex-col gap-4 max-sm:w-full">
          <div className="flex flex-col gap-8 w-11/12">
            <TypeBar close={() => setOpen(false)} />
            <BrandBar close={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
      <Select onValueChange={(sort) => device.setSort(sort)}>
        <SelectTrigger>
          <SelectValue placeholder="Сортировать" value={SORT.NAME} />
        </SelectTrigger>
        <SelectContent>
          {options.map((sort) => (
            <SelectItem key={sort.value} value={sort.value}>
              {sort.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        onClick={() => {
          device.setOrder(device.order === 'ASC' ? 'DESC' : 'ASC')
          console.log(device.order)
        }}
        className="flex items-center gap-2 w-full whitespace-nowrap"
      >
        <div className={device.order === 'ASC' && 'rotate-180'}>
          <ArrowIcon />
        </div>
        <span>{device.order === 'ASC' ? 'По возрастанию' : 'По убыванию'}</span>
      </Button>
    </div>
  )
})
