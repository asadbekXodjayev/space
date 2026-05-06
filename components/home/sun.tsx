import sunImg from '../../data/image_2026-05-06_11-46-05.png'


export function Sun() {
  return (
    <div className="relative flex-shrink-0 flex items-center" style={{ marginLeft: '' }}>
      <img
        src={sunImg.src}
        alt="Sun"
        // className="w-150 h-150"
        style={{ filter: 'drop-shadow(0 0 10px rgba(255, 200, 0, 0.8))' }}
      />
    </div>
  )
}
