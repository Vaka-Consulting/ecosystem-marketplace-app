import { NextLinkComposed, WalletConnector } from '@/components'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <NextLinkComposed to={'/'} sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          <Typography variant="h6" component="div">
            Marketplace Demo
          </Typography>
        </NextLinkComposed>
        <WalletConnector />
      </Toolbar>
    </AppBar>
  )
}
