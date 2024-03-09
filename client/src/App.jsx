import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Header from './components/Header'
function App() {


  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/projects" element={<Projects/>}></Route>
          <Route path="/sign-up" element={<Signup/>}></Route>
          <Route path="/sign-in" element={<Signin/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
