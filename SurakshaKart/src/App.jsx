import './App.css'
import Dashboard from './Pages/Dashboard'
import Cart from './Pages/Cart'
import Payment from './Pages/payment'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment" element={<Payment />} />
        <Route path='/Cart' element={<Cart />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
