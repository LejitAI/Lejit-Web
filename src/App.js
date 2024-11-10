
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Introduction from './pages/authentication/Introduction';
import LogIn from './pages/authentication/LogIn';
import LawFirmSignUp from './pages/authentication/LawFirmSignUp';
import EmailOTP from './pages/authentication/EmailOTP';
import LawFirmLanding from './pages/lawfirm/editLawFirm/LawFirmLanding';
import AddUser from './pages/lawfirm/forms/AddUser';
import ViewTeam from './pages/lawfirm/(dashboard)/ViewTeam';
import Profile from './pages/lawfirm/(dashboard)/Profile';
import CDashboard from './pages/citizen/Dashboard/CDashboard';
import MyCases from './pages/citizen/MyCases/MyCases';
import Appointments from './pages/citizen/MyCases/Appointments/Appointments';
import WelcomePage from './pages/WelcomePage';
import Topbar from './pages/citizen/global/Topbar';
import Dashboard from './pages/citizen/NDashboard/Dashboard'
import CitizenLayout from './pages/citizen/CitizenLayout';
import Cases from './pages/citizen/Cases/MyCases';
import LDashboard from './pages/law-firm/Dashboard';
import UserPage from './pages/law-firm/UserPage';
import LawFirmProfile from './pages/law-firm/LawFirmProfile';
import AddLawyer from './pages/law-firm/AddLawyer';
import LawyersList1 from './pages/law-firm/LawyerList';
import ManageCases from './pages/law-firm/CasePage';
import AppointmentManagement from './pages/law-firm/AppointmentPage';
import CaseView from './pages/law-firm/CaseView';
function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value = {colorMode}>
      <ThemeProvider theme = {theme}>
        <CssBaseline />  
        <Router>
          <Routes>
            <Route path="/" element={<Introduction />} />
            <Route path="/lawfirmsignup" element={<LawFirmSignUp />} />
            <Route path="/signin" element={<LogIn/>} /> 
            <Route path="/otp" element={<EmailOTP />} />
            <Route path="/landing" element={<LawFirmLanding />} />
            <Route path="/addUser" element={<AddUser />} />
            <Route path="/law-firm" element={<LDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="/law-firm/manage-case" element={<ManageCases/>} />
            <Route path="/law-firm/case/:id" element={<CaseView />} />
            <Route path="/law-firm/add-user" element={<UserPage />} />
            <Route path='/law-firm/profile' element={<LawFirmProfile/>}/>
            <Route path='/law-firm/appointments' element={<AppointmentManagement/>}/>
            <Route path='/law-firm/add-lawyer' element={<AddLawyer/>}/>
            <Route path='/law-firm/view-lawyer' element={<LawyersList1/>}/>
            {/* Dashboard Route */}
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/law-firm" element={<LDashboard />} />
            <Route path="/law-firm/add-user" element={<UserPage />} />
            <Route path='/law-firm/profile' element={<LawFirmProfile/>}/>
            {/* <Route path='/law-firm/add-client' element={<AddClientPage/>}/> */}
            <Route path='/law-firm/add-lawyer' element={<AddLawyer/>}/>
            <Route path='/law-firm/view-lawyer' element={<LawyersList1/>}/>
            <Route path="/citizen/cdashboard" element={<Dashboard />} />
            <Route path="/cases" element={<Cases />} />
            {/* <Route path="/contacts" element={<Contacts />} /> */}
            {/* <Route path="/invoices" element={<Invoices />} />*/}
            {/* <Route path="/form" element={<Form />} />*/}
            {/* <Route path="/bar" element={<Bar />} />*/}
            {/* <Route path="/pie" element={<Pie />} />*/}
            {/* <Route path="/line" element={<Line />} />*/}
            {/* <Route path="/faq" element={<FAQ />} />*/}
            {/* <Route path="/geography" element={<Geography />} />*/}
            {/* <Route path="/calendar" element={<Calendar />} />*/}
            <Route path="/citizen/mycases" element={<MyCases />} />
            <Route path="/citizen/appointments" element={<Appointments />} />
            
          </Routes>
    
        </Router>
    
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
