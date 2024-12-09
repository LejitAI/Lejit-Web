
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
import Appointments from './pages/lawfirm/(dashboard)/Appointments';
import AddCase from './pages/lawfirm/forms/AddCase';
import AskAI from './pages/lawfirm/global/AskAI';
import ConvoAgent from './pages/lawfirm/(dashboard)/ConvoAgent';
import EditProfile from './pages/lawfirm/forms/EditProfile';
import LDashboard from './pages/lawfirm/(dashboard)/DashboardOverview';
import ChatAI from './pages/lawfirm/global/ChatAI';
import CDashboard from './pages/citizen/Dashboard/CDashboard';
import MyCases from './pages/citizen/MyCases/MyCases';
import Topbar from './pages/citizen/global/Topbar';
import Dashboard from './pages/citizen/NDashboard/Dashboard'
import CitizenLayout from './pages/citizen/CitizenLayout';
import Cases from './pages/citizen/Cases/MyCases';


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
            <Route path="/addCase" element={<AddCase />} />
            <Route path="profile" element={<Profile />} />   
            <Route path="/appointments" element={<Appointments />} />      
            <Route path="/citizen/cdashboard" element={<Dashboard />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/AI" element={<AskAI />} />
            <Route path="/convoagent" element={<ConvoAgent />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/ldashboard" element={<LDashboard />} />
            <Route path="/chat" element={<ChatAI />} />
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
