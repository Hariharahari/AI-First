import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '@heroui/react'
import { Search, Bell, ChevronDown } from 'lucide-react'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#141414]/90 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-red-600 text-2xl font-bold">StreamFlix</Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
            <Link to="/tv-shows" className="text-white hover:text-gray-300">TV Shows</Link>
            <Link to="/movies" className="text-white hover:text-gray-300">Movies</Link>
            <Link to="/new-and-popular" className="text-white hover:text-gray-300">New & Popular</Link>
            <Link to="/my-list" className="text-white hover:text-gray-300">My List</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Search className="text-white cursor-pointer" />
          <Bell className="text-white cursor-pointer" />
          <Link to="/login">
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="User" className="cursor-pointer" />
          </Link>
          <ChevronDown className="text-white cursor-pointer" />
        </div>
      </div>
    </nav>
  )
}