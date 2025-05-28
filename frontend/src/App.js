
// import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Login from './components/Login/LoginFrm';
import SignUp from './components/Login/SignUpFrm';
import Home from './components/Home/HomeFrm';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Topbar from './components/topbar/Topbar';
import AccountMng from './components/AccountMng/AccountMngFrm';
import ChangePW from './components/AccountMng/ChangePWFrm';
import UserMng from './components/UserMng/UserMngFrm';
import EditUser from './components/UserMng/EditUserFrm';
import ReportedEventMng from './components/ViewReport/ReportedEventMngFrm';
import DetailReport from './components/ViewReport/DetailReportFrm';
import VoucherMng from './components/VoucherMng/VoucherMngFrm';
import AddVoucher from './components/VoucherMng/AddVoucherFrm';
import ViewVoucher from './components/VoucherMng/ViewVoucherFrm';
import PEMngMainUI from './components/PersonalEvent/PEMngMainUIFrm';
import CreatePE from './components/PersonalEvent/CreatePEFrm';
import ViewPE from './components/PersonalEvent/ViewPEFrm';
import PEMng from './components/PersonalEvent/PEMngFrm';
import UpdatePE from './components/PersonalEvent/UpdatePEFrm';
import CEMngMainUI from './components/CommunityEvent/CEMainUIFrm';
import CreateCE from './components/CommunityEvent/CreateCEFrm';
import ViewCE from './components/CommunityEvent/ViewCEFrm';
import CEMng from './components/CommunityEvent/CEMngFrm';
import AddTicket from './components/CommunityEvent/AddTicketTypeFrm';
import UpdateCE from './components/CommunityEvent/UpdateCEFrm';
import UpdateTicket from './components/CommunityEvent/UpdateTicketFrm';
import FindOrder from './components/Order/FindOrderFrm';
import ViewOrder from './components/Order/ViewOrderFrm';
import SelectEvent from './components/Verification/SelectEventFrm';
import CheckTicket from './components/Verification/CheckTicketFrm';
import GeneralStatistic from './components/Statistic/GerneralStatisticFrm';
import DetailEventStatistic from './components/Statistic/DetailEventStatisticFrm';
import FindEvent from './components/BookingEvent/FindEventFrm';
import DetailEvent from './components/BookingEvent/DetailEventFrm';
import Paying from './components/BookingEvent/PayingFrm';


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
            {user?.role === 'P' &&
              <Route path='explore' element={<Outlet />} >
                <Route index element={<FindEvent user={user} />} />
                <Route path=':id' element={<Outlet />}>
                  <Route index element={<DetailEvent user={user} />} />
                  <Route path='paying' element={<Paying user={user} />} />
                </Route>
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
