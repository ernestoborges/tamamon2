import { useEffect, useRef, useState } from 'react'

export default function PokemonCanva({ pokemonId }) {
  const [positionX, setPositionX] = useState(50)
  const [flipped, setFlipped] = useState(true)
  const [isWalking, setIsWalking] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [showDisplay, setShowDisplay] = useState(true)
  const [canvasWidth, setCanvasWidth] = useState(0)

  const canvasRef = useRef<HTMLDivElement | null>(null)

  const handleShowDisplay = () => {
    setShowDisplay(!showDisplay)
  }

  const background =
    'https://i.pinimg.com/originals/d3/88/57/d38857eeb3ff01be07c05fbfa80d3385.png'

  const handleCanvasClick = () => {
    setIsPaused(true)

    setTimeout(() => {
      setIsPaused(false)
    }, 2000)
  }

  useEffect(() => {
    if (isWalking) {
      const moveCharacter = () => {
        if (!isPaused) {
          const step = flipped ? 0.5 : -0.5
          setPositionX((prevX) => prevX + step)
          if (positionX >= canvasWidth - 50) {
            setFlipped(false)
          } else if (positionX < 50) {
            setFlipped(true)
          }
        }
      }

      const animationId = requestAnimationFrame(moveCharacter)

      return () => cancelAnimationFrame(animationId)
    }
  }, [positionX, flipped, isPaused, isWalking])

  useEffect(() => {
    const updateCanvasWidth = () => {
      if (canvasRef.current) {
        setCanvasWidth(canvasRef.current.offsetWidth)
      }
    }

    updateCanvasWidth()
    window.addEventListener('resize', updateCanvasWidth)

    return () => {
      window.removeEventListener('resize', updateCanvasWidth)
    }
  }, [])

  return (
    <div className='relative'>
      <div
        ref={canvasRef}
        className='relative flex w-[20rem] items-end overflow-hidden bg-cover bg-bottom transition-all duration-500'
        style={{
          backgroundImage: `url(${background})`,
          height: showDisplay ? '12rem' : '0'
        }}
      >
        <div className='relative flex w-full items-end pb-6'>
          <div
            className='absolute flex w-[0]'
            style={{
              left: `${isWalking ? `${positionX}px` : '50%'}`,
              transform: `scaleX(${isWalking ? (flipped ? -1 : 1) : 1}) translateX(50%)`,
              transformOrigin: '50% 50%'
            }}
          >
            <img
              onClick={handleCanvasClick}
              className='max-w-none -translate-x-1/2 transform'
              src={`/pokemons/gifs/${pokemonId}.gif`}
              alt={`Buddy image`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
