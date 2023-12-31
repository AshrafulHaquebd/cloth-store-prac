import { Link, Outlet } from 'react-router-dom'
import './navigation.styles.scss'
import { useContext } from 'react'
import { UserContext } from '../../context/user.context'
import { signOutUser } from '../../utils/firebase/firebase.utils'

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext)

  const signOutHandler = async () => {
    await signOutUser()
    setCurrentUser(null)
  }

  return (
    <>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <strong>Crown</strong>
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>

          {currentUser ? (
            <>
              <Link className='nav-link' onClick={signOutHandler}>
                SIGN OUT
              </Link>
              <Link className='nav-link'>{currentUser?.email}</Link>
            </>
          ) : (
            <Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Navigation
