

export default function Button({ text, onClick }) {
  return (
    <div onClick={onClick} className='border-1 bg-slate-500 p-2 rounded-md text-white cursor-pointer max-w-40 text-center'>
      { text }
    </div>
  )
}
