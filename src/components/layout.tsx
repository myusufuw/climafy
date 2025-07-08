import { type PropsWithChildren } from 'react'
import Footer from './footer'
import Header from './header'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='bg-gradient-to-br dark:from-background from-blue-400 dark:to-violet-950 to-violet-200 transition-colors duration-500'>
      <Header />
      <main className='min-h-screen container mx-auto px-4 py-8'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
