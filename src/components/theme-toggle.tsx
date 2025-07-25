import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/theme-provider'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <div
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`flex items-center cursor-pointer transition-transform duration-500 ${
        isDark ? 'rotate-180' : 'rotate-0'
      }`}
    >
      {isDark ? (
        <Sun className='h-6 w-6 text-yellow-500' />
      ) : (
        <Moon className='h-6 w-6 text-blue-500' />
      )}
      <span className='sr-only'>Toggle theme</span>
    </div>
  )
}

export default ThemeToggle
