import { Link } from 'react-router-dom'
import ThemeToggle from './theme-toggle'

const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link to={'/'}>
          <p className='text-3xl font-semibold'>CLIMAFY</p>
        </Link>

        <div className='flex gap-4'>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
