import { ReactNode } from 'react'
import { Header } from '@/components'
import Box from '@mui/material/Box'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <header>
        <Header />
      </header>
      <Box component={'main'}>{children}</Box>
      <footer />
    </>
  )
}
