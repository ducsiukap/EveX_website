
// import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/Login/SignUp';
import Home from './components/Home/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Topbar from './components/topbar/Topbar';
import AccountMng from './components/AccountMng/AccountMng';
import ChangePW from './components/AccountMng/ChangePW';
import UserMng from './components/UserMng/UserMng';
import EditUser from './components/UserMng/EditUser';

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
        <Topbar user={user} onLogout={setUser} />
        <Routes>
          <Route path='*' element={<Login isLoggedIn={isLoggedIn} onSubmit={setUser} />} />
          <Route path='/login' element={<Login isLoggedIn={isLoggedIn} onSubmit={setUser} />} />
          <Route path='/signup' element={<SignUp isLoggedIn={isLoggedIn} onSubmit={setUser} />} />

          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} user={user}/>}>
            <Route path='/home' element={<Home user={user} />} />
            {user?.role !== 'A' && 
            <Route path='/profile' element={<Outlet />}>
              <Route index element={<AccountMng user={user} onSave={setUser} />} />
              <Route path='changepw' element={<ChangePW user={user} onSave={setUser} />} />
            </Route>}
            {user?.role === 'A' &&
              <Route path='/users' element={<Outlet />} >
                <Route index element={<UserMng admin={user} />} />
                <Route path=':uid' element={<EditUser />} />
              </Route>
            }
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
