import { Routes, Route } from 'react-router-dom'
import Home from './router/Home/Home.component'
import Navigation from './router/Navigation/Navigation.component'
import Authentication from './router/sign-in/Authentication.components'

const Shop = () => {
  return <h2>Welcome to shop.</h2>
}

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/auth' element={<Authentication />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
