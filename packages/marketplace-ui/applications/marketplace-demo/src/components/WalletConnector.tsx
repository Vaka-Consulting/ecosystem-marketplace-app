import { MouseEvent, useEffect, useState } from 'react'
import { useWallet, useWalletList, useLovelace } from '@meshsdk/react'
import { Button, Menu, MenuItem, MenuList } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { TOKEN_LABEL } from '@/constants'

const localStorageKey = 'connected-wallet'

function ConnectWallet() {
  const { connect } = useWallet()
  const walletList = useWalletList()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        color="inherit"
        variant="outlined"
        id="connect-wallet-button"
        aria-controls={open ? 'connect-wallet-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Connect Wallet
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'connect-wallet-button',
        }}
      >
        <MenuList>
          {walletList.map(({ id, name, icon }) => (
            <MenuItem key={id} sx={{ gap: 1 }} onClick={() => connect(name)}>
              <img src={icon} alt="wallet" width={24} height={24} /> {name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  )
}

function DisconnectWallet() {
  const { name: walletName, disconnect } = useWallet()
  const walletList = useWalletList()
  const lovelace = useLovelace()

  const connectedWallet = walletList.find((wallet) => wallet.name === walletName)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const disconnectWallet = () => {
    disconnect()
    localStorage.removeItem(localStorageKey)
  }

  return (
    <>
      <Button
        sx={{ display: 'flex', 'align-items': 'center', gap: 1, textTransform: 'none' }}
        color="inherit"
        variant="outlined"
        id="wallet-button"
        aria-controls={open ? 'wallet-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <img src={connectedWallet?.icon} width={24} height={24} alt="Connected wallet" /> {Number(lovelace) / 1000000}{' '}
        {TOKEN_LABEL}
      </Button>
      <Menu
        id="wallet-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'wallet-button',
        }}
      >
        <MenuList>
          <MenuItem onClick={disconnectWallet}>Disconnect Wallet</MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

function WalletConnector() {
  const [initialLoading, setInitialLoading] = useState<boolean>(true)
  const { name: walletName, connect, connecting, connected } = useWallet()

  useEffect(() => {
    setInitialLoading(connecting)
  }, [connecting])

  useEffect(() => {
    if (walletName && connected) {
      localStorage.setItem('connected-wallet', walletName)
    }
  }, [walletName, connected])

  const handleStoredWalletName = async (storedWalletName: string) => {
    await connect(storedWalletName)
    setInitialLoading(false)
  }

  /**
   * Handle connected wallet state from Local Storage
   */
  useEffect(() => {
    const storedWalletName = localStorage.getItem(localStorageKey)

    if (storedWalletName) {
      void handleStoredWalletName(storedWalletName)
    } else {
      setInitialLoading(false)
    }
  }, [])

  if (initialLoading) return <LoadingButton loading={initialLoading} />
  if (connected) return <DisconnectWallet />

  return <ConnectWallet />
}

export default WalletConnector
