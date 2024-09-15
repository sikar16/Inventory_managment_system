import './App.css'
import { router } from './routes/index'
import { RouterProvider } from 'react-router-dom'

function App() {

  return (
    <>
      <div className='bg-[#F3F3F6] text-[#002A47] dark:bg-zinc-950 dark:text-white  w-full h-[100%]  items-center justify-center'>
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
