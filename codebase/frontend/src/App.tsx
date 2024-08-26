import './App.css'
import { router } from './routes/index'
import { RouterProvider } from 'react-router-dom'

function App() {

  return (
    <>
      <div className='bg-[#002A47] text-white dark:bg-slate-900 dark:text-white w-full h-screen   items-center justify-center'>
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
