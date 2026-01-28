import React, { useState } from 'react';
import { Box } from '@heroui/react';
import { Button } from '@heroui/react';
import { MenuIcon, XMarkIcon } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
      bg="bg-slate-800/20 backdrop-blur-md shadow-md"
      px={4}
      py={2}
    >
      <Box
        flex="justify-between items-center"
        maxW="7xl"
        mx="auto"
        px={3}
        py={2}
      >
        <Box>
          <Button
            size="sm"
            variant="ghost"
            leftIcon="E"
            className="text-white"
          >
            Elevate
          </Button>
        </Box>

        {/* Desktop navigation links */}
        <Box className="hidden md:flex space-x-4">
          <Button variant="ghost" className="text-white">
            Home
          </Button>
          <Button variant="ghost" className="text-white">
            Services
          </Button>
          <Button variant="ghost" className="text-white">
            Contact
          </Button>
        </Box>

        {/* Mobile menu toggle button */}
        <Button
          variant="ghost"
          className="md:hidden"
          leftIcon={
            menuOpen ? (
              <XMarkIcon className="h-6 w-6 text-white" />
            ) : (
              <MenuIcon className="h-6 w-6 text-white" />
            )
          }
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen && (
            <Box className="absolute right-2 top-8 w-48 bg-slate-900/50 rounded-md shadow-lg">
              <div className="p-4 space-y-2">
                <Button
                  variant="ghost"
                  className="text-white w-full text-left px-0"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Button>
                <Button
                  variant="ghost"
                  className="text-white w-full text-left px-0"
                  onClick={() => setMenuOpen(false)}
                >
                  Services
                </Button>
                <Button
                  variant="ghost"
                  className="text-white w-full text-left px-0"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </Button>
              </div>
            </Box>
          )}
        </Button>

        {/* Right side icons */}
        <Box className="hidden md:flex space-x-3">
          <Button
            size="sm"
            variant="ghost"
            className="text-white"
          >
            <span aria-label="Twitter">t</span>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white"
          >
            <span aria-label="LinkedIn">in</span>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}