import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import About from './pages/About'
import Profile from './pages/Profile';
import Header from './components/Header'
import PrivateRoutes from './components/PrivateRoutes'
import CreateGround from './pages/CreateGround'
import UpdateProfile from './pages/UpdateProfile'
import UpdateGround from './pages/UpdateGround'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path='/update-profile' element={<UpdateProfile />} />
          <Route path='/create-ground' element={<CreateGround />} />
          <Route path='/update-ground/:groundId' element={<UpdateGround />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
