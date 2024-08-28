import { CloseIcon } from './shared/close-icon'
import { Button } from './ui/button'

export const CharacteristicItem = ({
  char,
  characteristics,
  setCharacteristic,
}) => {
  const deleteCharacteristic = (title) => {
    setCharacteristic(characteristics.filter((char) => char.title !== title))
  }

  return (
    <div className="flex items-center gap-4 border-input bg-background px-3 py-2 border rounded-md ring-offset-background focus-visible:ring-offset-2 w-max max-md:max-w-full min-h-10 text-sm file:text-sm">
      <div className="flex max-md:flex-wrap gap-2">
        <span className="max-md:break-all">{char.title}:</span>
        <span className="max-md:break-all">{char.description}</span>
      </div>
      <Button
        size="icon"
        variant="destructive"
        type="button"
        onClick={() => deleteCharacteristic(char.title)}
        className="p-1 w-6 h-6"
      >
        <CloseIcon className="text-white" />
      </Button>
    </div>
  )
}
