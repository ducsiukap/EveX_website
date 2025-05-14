
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
import ReportedEventMng from './components/ViewReport/ReportedEventMng';
import DetailReport from './components/ViewReport/DetailReport';
import VoucherMng from './components/VoucherMng/VoucherMng';
import AddVoucher from './components/VoucherMng/AddVoucher';
import ViewVoucher from './components/VoucherMng/ViewVoucher';
import PEMngMainUI from './components/PersonalEvent/PEMngMainUI';
import CreatePE from './components/PersonalEvent/CreatePE';
import ViewPE from './components/PersonalEvent/ViewPE';
import PEMng from './components/PersonalEvent/PEMng';
import UpdatePE from './components/PersonalEvent/UpdatePE';
import CEMngMainUI from './components/CommunityEvent/CEMainUI';
import CreateCE from './components/CommunityEvent/CreateCE';
import ViewCE from './components/CommunityEvent/ViewCE';
import CEMng from './components/CommunityEvent/CEMng';
import AddTicket from './components/CommunityEvent/AddTicketType';
import UpdateCE from './components/CommunityEvent/UpdateCE';
import UpdateTicket from './components/CommunityEvent/UpdateTicket';
import FindOrder from './components/Order/FindOrder';
import ViewOrder from './components/Order/ViewOrder';
import SelectEvent from './components/Verification/SelectEvent';
import CheckTicket from './components/Verification/CheckTicket';
import GeneralStatistic from './components/Statistic/GerneralStatistic';
import DetailEventStatistic from './components/Statistic/DetailEventStatistic';


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
  }, [user, isLoggedIn])

  // console.log(user);

  return (
    <div className="App">
      <Router>
        <Topbar user={user} onLogout={setUser} />
        <Routes>
          <Route path='*' element={<Login isLoggedIn={isLoggedIn} onSubmit={setUser} />} />
          <Route path='/login' element={<Login isLoggedIn={isLoggedIn} onSubmit={setUser} />} />
          <Route path='/signup' element={<SignUp isLoggedIn={isLoggedIn} onSubmit={setUser} />} />

          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} user={user} />}>
            <Route path='/home' element={<Home user={user} />} />
            {user?.role !== 'A' &&
              <Route path='/profile' element={<Outlet />}>
                <Route index element={<AccountMng user={user} onSave={setUser} />} />
                <Route path='changepw' element={<ChangePW user={user} onSave={setUser} />} />
              </Route>}
            {/* admin */}
            {user?.role === 'A' &&
              <Route path='/users' element={<Outlet />} >
                <Route index element={<UserMng admin={user} />} />
                <Route path=':uid' element={<EditUser />} />
              </Route>
            }
            {user?.role === 'A' &&
              <Route path='/reports' element={<Outlet />} >
                <Route index element={<ReportedEventMng />} />
                <Route path=':eid' element={<DetailReport />} />
              </Route>
            }
            {user?.role === 'A' &&
              <Route path='/vouchers' element={<Outlet />} >
                <Route index element={<VoucherMng />} />
                <Route path='view' element={<Outlet />}>
                  <Route path=':vid' element={<ViewVoucher />} />
                </Route>
                <Route path='add' element={<AddVoucher />} />
              </Route>
            }

            {/* personal */}
            {user?.role === 'P' &&
              <Route path='/my-events' element={<Outlet />}>
                <Route index element={<PEMngMainUI />} />
                <Route path='create' element={<CreatePE user={user} />} />
                <Route path='view' element={<Outlet />}>
                  <Route index element={<PEMng user={user} />} />
                  <Route path=':id' element={<ViewPE user={user} />} />
                </Route>
                <Route path='modify/:id' element={<UpdatePE user={user} />} />
              </Route>
            }
            {
              user?.role === 'P' &&
              <Route path='orders' element={<Outlet />}>
                <Route index element={<FindOrder user={user} />} />
                <Route path=':id' element={<ViewOrder user={user} />} />
              </Route>
            }

            {/* org */}
            {user?.role === 'O' &&
              <Route path='/my-events' element={<Outlet />}>
                <Route index element={<CEMngMainUI />} />
                <Route path='create' element={<CreateCE user={user} />} />
                <Route path='view' element={<Outlet />}>
                  <Route index element={<CEMng user={user} />} />
                  <Route path=':id' element={<ViewCE user={user} />} />
                </Route>
                <Route path='add-tickets' element={<AddTicket user={user} />} />
                <Route path='modify/:id' element={<UpdateCE user={user} />} />
                <Route path='modify-ticket' element={<UpdateTicket user={user} />} />
              </Route>
            }
            {user?.role === 'O' &&
              <Route path='/verification' element={<Outlet />} >
                <Route index element={<SelectEvent user={user} />} />
                <Route path=':id' element={<CheckTicket user={user} />} />
              </Route>
            }
            {user?.role === 'O' &&
              <Route path='/statistics' element={<Outlet />} >
                <Route index element={<GeneralStatistic user={user} />} />
                <Route path=':id' element={<DetailEventStatistic user={user} />} />
              </Route>
            }
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
