
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Introduction from './pages/authentication/Introduction';
import LogIn from './pages/authentication/LogIn';
import LawFirmSignUp from './pages/authentication/LawFirmSignUp';
import CorporateSignUp from './pages/authentication/CorporateSignUp';
import EmailOTP from './pages/authentication/EmailOTP';
import LawFirmLanding from './pages/lawfirm/editLawFirm/LawFirmLanding';
import CorporateLanding from './pages/corporate/editLawFirm/LawFirmLanding';
import AddUser from './pages/lawfirm/forms/AddUser';
import ViewTeam from './pages/lawfirm/(dashboard)/ViewTeam';
import Profile from './pages/lawfirm/(dashboard)/Profile';
import Appointments from './pages/lawfirm/(dashboard)/Appointments/Appointmentsub';
import CitizenAppointments from './pages/citizen/Appointments/Appointmentsub';
import OverallHearing from './pages/lawfirm/(dashboard)/HearingSchedules/OverallHearing';
import CitizenHearing from './pages/citizen/HearingSchedules/OverallHearing';
import AddCase from './pages/lawfirm/forms/AddCase';
import AskAI from './pages/lawfirm/global/AskAI';
import ConvoAgent from './pages/lawfirm/(dashboard)/ConvoAgent';
import EditProfile from './pages/lawfirm/forms/EditProfile';
import LDashboard from './pages/lawfirm/(dashboard)/DashboardOverview';
import ChatAI from './pages/lawfirm/global/ChatAI';
import ClientsOverview from './pages/lawfirm/(dashboard)/ClientsOverview'
import AddClient from './pages/lawfirm/forms/AddClient'
import ClientDetails from './pages/lawfirm/(dashboard)/EachClient'
import OverallClientDetails from './pages/lawfirm/(dashboard)/OverallClientDetails';
import OverallProfile from './pages/lawfirm/(dashboard)/OverallProfile';
import CorporateOverallProfile from './pages/corporate/(dashboard)/OverallProfile';
import OverallCases from './pages/lawfirm/(dashboard)/OverallCases';
import CitizenCases from './pages/citizen/cases/OverallCases';
import CitizenSignUp from './pages/authentication/CitizenSignUp';
import Lawyers from './pages/citizen/lawyers/overallLawyersCategory';
import ChatInterface from './pages/AI/components/Chat/ChatInterface';
import Chatdashboard from './pages/AI/pages/DashboardPage';
import Analytics from './pages/lawfirm/(dashboard)/Analytics'
import OverallAnalytics from './pages/lawfirm/(dashboard)/OverallAnalytics'
import Documents from './pages/lawfirm/(dashboard)/Documents'
import Templates from './pages/lawfirm/(dashboard)/LegalTemplates'
import Knowledge from './pages/lawfirm/(dashboard)/KnowledgeHub'
import LegalDocumentTemplates from './pages/AI/components/Chat/docgen/legaldoctemplates'

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
            <Route path="/corporatesignup" element={<CorporateSignUp />} />
            <Route path="/signin" element={<LogIn/>} /> 
            <Route path="/otp" element={<EmailOTP />} />
            <Route path="/landing" element={<LawFirmLanding />} />
            <Route path="/corporatelanding" element={<CorporateLanding />} />
            <Route path="/addUser" element={<AddUser />} />
            <Route path="/addCase" element={<AddCase />} />
            <Route path="profile" element={<Profile />} />   
            <Route path="/appointments" element={<Appointments />} /> 
            <Route path="/citizenappointments" element={<CitizenAppointments />} /> 
            <Route path="/hearing" element={<OverallHearing />} />  
            <Route path="/citizenhearing" element={<CitizenHearing />} />  
            <Route path="/AI" element={<AskAI />} />
            <Route path="/convoagent" element={<ConvoAgent />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/ldashboard" element={<LDashboard />} />
            <Route path="/chat" element={<ChatAI />} />
            <Route path="/clients" element={<ClientsOverview/>} />
            <Route path="/addclient" element={<AddClient/>} />
            <Route path="/clientdetails" element={<ClientDetails/>} />
            <Route path="/overallclient" element={<OverallClientDetails/>} />
            <Route path="/overallprofile" element={<OverallProfile/>} />
            <Route path="/corporateoverallprofile" element={<CorporateOverallProfile/>} />
            <Route path="/overallcases" element={<OverallCases/>} />
            <Route path="/citizencases" element={<CitizenCases />} />
            <Route path="/chatinterface" element={<ChatInterface />} />
            <Route path="/chatdashboard" element={<Chatdashboard />} />
            <Route path="/analytics" element={<OverallAnalytics />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/templates" element={<Templates />} />
            {/* <Route path="/contacts" element={<Contacts />} /> */}
            
            <Route path="/citizensignup" element={<CitizenSignUp />} />
            <Route path="/lawyers" element={<Lawyers />} />
            <Route path="/legaldoctemplates" element={<LegalDocumentTemplates />} />
            
           
          </Routes>
    
        </Router>
    
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
