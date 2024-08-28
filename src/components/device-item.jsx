import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '@/lib/price-format'
import { Context } from '@/main'
import { PRODUCT_ROUTE } from '@/utils/consts'
import { BuyButton } from './buy-button'
import { RatingItem } from './rating-item'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'

export const DeviceItem = observer(({ device }) => {
  const { user } = useContext(Context)

  return (
    <Card className="flex flex-col justify-between max-w-96 h-full">
      <div>
        <CardHeader>
          <Carousel>
            <CarouselContent>
              {device?.photos?.map((img) => (
                <CarouselItem key={img.id} className="rounded-sm">
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
          <CardTitle>
            <Link
              className="hover:text-accent-foreground"
              to={`${PRODUCT_ROUTE}/${device?.id}`}
            >
              {device?.name}
            </Link>
          </CardTitle>
          <RatingItem device={device} userId={user.user.id} />
        </CardHeader>
      </div>
      <div>
        <CardContent>
          <p className="text-24">{formatPrice(device?.price)}</p>
        </CardContent>
        <CardFooter>
          <BuyButton deviceId={device?.id} />
        </CardFooter>
      </div>
    </Card>
  )
})
