import { useEffect, useState } from 'react'
import { CloseIcon } from './shared/close-icon'
import { AddFileIcon } from './ui/add-file-icon'
import { Button } from './ui/button'

export const FileInput = ({
  prevFiles,
  setFiles,
  cleanInput,
  setCleanInput,
}) => {
  const [drag, setDrag] = useState(false)
  const [images, setImages] = useState([])

  useEffect(() => {
    if (cleanInput) {
      setImages([])
    }
    setCleanInput(false)
  }, [cleanInput])

  const imagesHandler = (files) => {
    const fileUrls = files.map((file) => {
      if (file.type.startsWith('image/')) {
        const urls = {
          name: file.name,
          url: URL.createObjectURL(file),
        }
        return urls
      }
      return null
    })
    setImages([...images, ...fileUrls.filter((url) => url !== null)])
  }

  const deleteImage = (imageName) => {
    setFiles(prevFiles.filter((file) => file.name !== imageName))
    setImages(images.filter((image) => image.name !== imageName))
  }

  const dragStartHandler = (e) => {
    e.preventDefault()
    setDrag(true)
  }

  const dragLeaveHandler = (e) => {
    e.preventDefault()
    setDrag(false)
  }

  const onDropHandler = (e) => {
    e.preventDefault()
    const files = [...e.dataTransfer.files]
    const newFiles = files.filter(
      (file) => !prevFiles.some((prevFile) => prevFile.name === file.name),
    )
    setFiles([...prevFiles, ...newFiles])
    setDrag(false)

    imagesHandler(newFiles)
  }

  const onChangeHandler = (e) => {
    const files = Object.values(e.target.files)
    const newFiles = files.filter(
      (file) => !prevFiles.some((prevFile) => prevFile.name === file.name),
    )
    setFiles([...prevFiles, ...newFiles])

    imagesHandler(newFiles)
  }

  return (
    <div
      className={`flex items-center gap-4 ${drag ? 'border-primary' : 'border-input'}  file:border-0 bg-background file:bg-transparent disabled:opacity-50  border border-dashed rounded-md w-full  file:font-medium text-muted-foreground text-sm file:text-sm disabled:cursor-not-allowed ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative min-h-14`}
    >
      {drag ? (
        <div
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDrop={(e) => onDropHandler(e)}
          className={`absolute inset-0 flex items-center px-3 py-2 ${images.length === 0 ? '' : 'opacity-0'}`}
        >
          Отпустите файлы для загрузки
        </div>
      ) : (
        <div
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          className={`absolute inset-0 flex items-center px-3 py-2 ${images.length === 0 ? '' : 'opacity-0'}`}
        >
          Перетащите файлы для загрузки
        </div>
      )}

      <div className="flex flex-wrap flex-shrink-0 gap-2 px-3 py-2 w-3/4 max-sm:w-[88%]">
        {images.length > 0 &&
          images.map((image) => (
            <div
              key={image.name}
              className="relative flex-shrink-0 rounded-sm w-24 max-sm:w-14 h-24 max-sm:h-14 overflow-hidden aspect-square"
            >
              <img
                src={image.url}
                alt={image.name}
                className="h-full object-contain"
              />
              <Button
                size="icon"
                variant="destructive"
                type="button"
                onClick={() => deleteImage(image.name)}
                className="top-1 right-1 absolute p-1 w-6 h-6"
              >
                <CloseIcon className="text-white" />
              </Button>
            </div>
          ))}
      </div>

      <div className="right-0 absolute pr-3">
        <Button
          type="button"
          className="relative flex gap-2 max-sm:p-0 max-sm:w-10"
        >
          <input
            className="absolute inset-0 opacity-0"
            type="file"
            multiple
            onChange={(e) => onChangeHandler(e)}
          />
          <span className="max-sm:hidden">Выбрать файлы</span>
          <AddFileIcon className="sm:hidden" />
        </Button>
      </div>
    </div>
  )
}
