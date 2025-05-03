
// import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/Login/SignUp';
import Home from './components/Home/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Topbar from './components/topbar/Topbar';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isLoggedIn = !!user;

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('user', JSON.stringify(user));
    } else localStorage.removeItem('user');
  }, [user])

  console.log(user);

  return (
    <div className="App">
      <Router>
      <Topbar user={user} onLogout={setUser}/>
        <Routes>
          <Route path='*' element={<Login isLoggedIn={isLoggedIn} onSubmit={setUser} />} />
          <Route path='/login' element={<Login isLoggedIn={isLoggedIn} onSubmit={setUser} />} />
          {/* <Route path='/home' element={"Hihi"} /> */}
          <Route path='/signup' element={<SignUp isLoggedIn={isLoggedIn} onSubmit={setUser} />} />
          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
            <Route path='/home' element={<Home user={user}/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
