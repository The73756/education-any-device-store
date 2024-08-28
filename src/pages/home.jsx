import { BrandBar } from '@/components/brand-bar'
import { CustomPagination } from '@/components/custom-pagination'
import { DeviceList } from '@/components/device-list'
import { Header } from '@/components/header'
import { Sort } from '@/components/sort'
import { TypeBar } from '@/components/type-bar'
import { Toaster } from '@/components/ui/toaster'

export const Home = () => {
  return (
    <>
      <div className="font-nunito-sans">
        <Header />
        <div className="items-start gap-8 max-lg:gap-4 grid grid-cols-5 max-md:grid-cols-4 my-8 container">
          <div className="flex flex-col flex-grow gap-4 max-md:hidden col-span-1">
            <TypeBar />
            <BrandBar />
          </div>
          <div className="flex flex-col gap-8 col-span-4">
            <Sort />
            <DeviceList />
            <CustomPagination />
          </div>
        </div>
      </div>
      <Toaster duration={3000} />
    </>
  )
}
