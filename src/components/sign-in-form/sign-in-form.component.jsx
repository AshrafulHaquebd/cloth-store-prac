import { useState, useContext } from 'react'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils'

import { UserContext } from '../../context/user.context'

const defaultFormField = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formData, setFormData] = useState(defaultFormField)
  const { email, password } = formData

  const { setCurrentUser } = useContext(UserContext)

  const resetFormFields = () => {
    setFormData(defaultFormField)
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData({ ...formData, [name]: value })
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, password)
      setCurrentUser(user)
      resetFormFields()
      console.log(user)
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email')
          break
        case 'auth/user-not-found':
          alert('no user associated with this email')
          break
        case 'auth/invalid-credential':
          alert('Incorrect password or email')
          break
        default:
          console.log(error)
      }
    }
  }

  return (
    <>
      <h2>Already have an account?</h2>
      <p>Sign in with Email and password</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor='signInEmail'>Email: </label>
        <input
          type='email'
          name='email'
          id='signInEmail'
          onChange={handleChange}
          value={email}
          required
        />
        <label htmlFor='signInPassword'>Password: </label>
        <input
          type='password'
          name='password'
          id='signInPassword'
          onChange={handleChange}
          value={password}
          required
        />

        <button type='submit'>Sign in</button>
        <button type='button' onClick={signInWithGoogle}>
          Sign in with google
        </button>
      </form>
    </>
  )
}

export default SignInForm
