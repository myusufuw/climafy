import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='border-t backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-col justify-center items-center py-4'>
      <div className='flex flex-col items-center'>
        <p className='text-2xl font-semibold'>CLIMAFY</p>
        <p className='text-lg text-muted-foreground'>
          "Your Climate, Simplified."
        </p>
      </div>

      <Link
        to='https://myusufuw.com'
        target='_blank'
        rel='noopener noreferrer'
        className='mt-4'
      >
        &copy; {new Date().getFullYear()} myusufuw.com
      </Link>
    </footer>
  )
}

export default Footer
