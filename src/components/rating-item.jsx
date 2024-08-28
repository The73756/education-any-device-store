import { useState } from 'react'
import ReactStars from 'react-stars'
import { createRating } from '@/api/ratingApi'
import { useToast } from './ui/use-toast'

export const RatingItem = ({ device, userId, size }) => {
  const [localRate, setLocalRate] = useState(device.rating)
  const { toast } = useToast()

  const changeRating = async (rate) => {
    try {
      const { newRating } = await createRating({
        deviceId: device.id,
        userId,
        rate,
      })
      setLocalRate(newRating)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка авторизации',
        description: error.response.data.message,
      })
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground">{localRate}</span>
      <ReactStars
        count={5}
        onChange={(rate) => changeRating(rate)}
        value={localRate}
        size={size || 24}
        isHalf={true}
        activeColor="#ffd700"
      />
    </div>
  )
}
