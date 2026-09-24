import { createContext, useContext } from 'react'
import type { SectionId } from '../data/sections'

type NavContextValue = {
  go: (id: SectionId) => void
}

const NavContext = createContext<NavContextValue | null>(null)

export const NavProvider = NavContext.Provider

export function useNav(): NavContextValue {
  const ctx = useContext(NavContext)
  if (!ctx) throw new Error('useNav must be used within a NavProvider')
  return ctx
}
