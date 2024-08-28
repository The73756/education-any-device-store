import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchOneDevice } from '@/api/deviceApi'
import { createRating } from '@/api/ratingApi'
import { BuyButton } from '@/components/buy-button'
import { Header } from '@/components/header'
import { RatingItem } from '@/components/rating-item'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Loader } from '@/components/ui/loader'
import { Toaster } from '@/components/ui/toaster'
import { formatPrice } from '@/lib/price-format'
import { Context } from '@/main'

export const Product = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)
  const [device, setDevice] = useState({ photos: [], info: [] })
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    fetchOneDevice(id)
      .then((data) => setDevice(data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <div>
        <Header />
        <div className="my-8 container">
          <div className="gap-8 max-sm:gap-3 grid grid-cols-2 max-sm:grid-cols-1">
            <Carousel
              opts={{
                align: 'start',
              }}
            >
              <CarouselContent>
                {device.photos.map((img) => (
                  <CarouselItem
                    key={img.id}
                    className="rounded-sm basis-1/3 max-lg:basis-1/2 max-sm:basis-1/3 max-[440px]:basis-1/2"
                  >
                    <div className="rounded-sm overflow-hidden aspect-square">
                      <img
                        className="w-full h-full object-contain"
                        src={`${import.meta.env.VITE_API_URL}/${img.url}`}
                        alt={img.url}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex gap-4 mt-6">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
            <div className="flex flex-col justify-between gap-3">
              <div className="flex flex-col">
                <h2 className="font-semibold text-3xl leading-none tracking-tight">
                  {device.name}
                </h2>
                <RatingItem device={device} userId={user.user.id} size={32} />
              </div>
              <p className="text-24">{formatPrice(device.price)}</p>
              <div className="w-1/2 max-[440px]:w-full max-sm:w-1/2 max-md:w-full">
                <BuyButton deviceId={device?.id} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-8 w-1/2 max-sm:w-full">
            <h3 className="font-semibold text-xl leading-none tracking-tight">
              Описание:
            </h3>
            {device.description}
          </div>
          <div className="flex flex-col mt-8">
            {device.info.map((info) => (
              <div
                key={info.id}
                className="items-center gap-8 grid grid-cols-2 odd:bg-accent px-2 py-2 rounded-md"
              >
                <p>{info.title}</p>
                <p>{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Toaster duration={3000} />
    </>
  )
})
