import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { deleteRating, fetchRatings } from '@/api/ratingApi'
import { DeviceItem } from '@/components/device-item'
import { Header } from '@/components/header'
import { DeleteIcon } from '@/components/shared/delete-icon'
import { NoRatingIcon } from '@/components/shared/no-rating-icon'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/components/ui/use-toast'
import { Context } from '@/main'

export const RatedProducts = observer(() => {
  const { rating, user } = useContext(Context)
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const removeRate = async ({ id, deviceId }) => {
    try {
      await deleteRating(id, deviceId)
      toast({
        title: 'Успешно!',
        description: 'Оценка успешно удалена',
      })
      const ratingDevices = await fetchRatings(user.user.id)
      rating.setRatedDevices(ratingDevices)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка удаления',
        description: error.response.data.message,
      })
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchRatings(user.user.id)
      .then((data) => {
        console.log(data)
        rating.setRatedDevices(data)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <div>
        <Header />
        <h2 className="mt-8 font-semibold text-3xl container">
          Оцененные товары
        </h2>
        <div className="my-8 container">
          {rating.ratedDevices.length === 0 && (
            <div className="flex flex-col justify-center items-center gap-4 mt-20">
              <NoRatingIcon />
              <p>Вы еще не оценивали товары</p>
            </div>
          )}
          <div className="gap-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
            {rating.ratedDevices.map((device) => (
              <div key={device.id} className="relative">
                <DeviceItem device={device.device} />
                <Button
                  className="top-0 right-0 absolute"
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    removeRate({ id: device.id, deviceId: device.deviceId })
                  }
                >
                  <DeleteIcon />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Toaster duration={3000} />
    </>
  )
})
