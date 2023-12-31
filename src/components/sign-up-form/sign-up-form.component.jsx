import { useState } from 'react'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

const defaultFormField = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formData, setFormData] = useState(defaultFormField)
  const { displayName, email, password, confirmPassword } = formData

  const resetFormFields = () => {
    setFormData(defaultFormField)
  }

  console.log(formData)
  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('Password do not match!')
      return
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      await createUserDocumentFromAuth(user, { displayName })
      resetFormFields()
    } catch (error) {
      error.code === 'auth/email-already-in-use'
        ? alert(`cann't create user, email already in use`)
        : console.log('user creation encountered an error', error.message)
    }
  }

  return (
    <>
      <h2>Don't Have an Account?</h2>
      <p>Sign up with Email and password</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor='displayName'>Name: </label>
        <input
          type='text'
          name='displayName'
          id='displayName'
          onChange={handleChange}
          value={displayName}
        />
        <label htmlFor='email'>Email: </label>
        <input
          type='email'
          name='email'
          id='email'
          onChange={handleChange}
          value={email}
        />
        <label htmlFor='password'>Password: </label>
        <input
          type='password'
          name='password'
          id='password'
          onChange={handleChange}
          value={password}
        />
        <label htmlFor='confirmPassword'>Confirm Password:</label>
        <input
          type='password'
          name='confirmPassword'
          id='confirmPassword'
          onChange={handleChange}
          value={confirmPassword}
        />
        <button type='submit'>Sign Up</button>
      </form>
    </>
  )
}

export default SignUpForm
