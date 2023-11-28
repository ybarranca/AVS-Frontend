import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//pages & components
import Home from './pages/Home'
import Signon from './pages/Signon'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import AddressVerificationPage from './pages/AddressVerificationPage'
import AddressUpdatePage from './pages/AddressUpdatePage'


function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={ user ? <Home /> : <Navigate to="/signon"/>}
            />
            <Route
              path="/Signon"
              element={!user ? <Signon /> : <Navigate to="/"/>}
            />
            <Route
              path="/Signup"
              element={!user ? <Signup /> : <Navigate to="/"/> }
            />
            <Route
              path="/address-verification" element={<AddressVerificationPage />}
            />
            <Route 
              path="/update-address/:id" element={<AddressUpdatePage />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
