export const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex items-center gap-2">
        <div className="bg-primary rounded-full w-5 h-5 animate-bounce" />
        <div className="bg-primary rounded-full w-5 h-5 animate-bounce delay-200" />
        <div className="bg-primary rounded-full w-5 h-5 animate-bounce delay-300" />
      </div>
    </div>
  )
}
