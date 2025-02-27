import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Introduction from './pages/authentication/Introduction';
import LogIn from './pages/authentication/LogIn';
import LawFirmSignUp from './pages/authentication/LawFirmSignUp';
import CorporateSignUp from './pages/authentication/CorporateSignUp';
import EmailOTP from './pages/authentication/EmailOTP';
import LawFirmLanding from './pages/lawfirm/editLawFirm/LawFirmLanding';
import AddUser from './pages/lawfirm/forms/AddUser';
import ViewTeam from './pages/citizen/lawyers/ViewTeam';
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
import ClientsOverview from './pages/lawfirm/(dashboard)/ClientsOverview';
import AddClient from './pages/lawfirm/forms/AddClient';
import ClientDetails from './pages/lawfirm/(dashboard)/EachClient';
import OverallClientDetails from './pages/lawfirm/(dashboard)/OverallClientDetails';
import OverallProfile from './pages/lawfirm/(dashboard)/OverallProfile';
import OverallCases from './pages/lawfirm/(dashboard)/OverallCases';
import CitizenCases from './pages/citizen/cases/OverallCases';
import CitizenSignUp from './pages/authentication/CitizenSignUp';
import Lawyers from './pages/citizen/lawyers/overallLawyersCategory';
import ChatInterface from './pages/AI/components/Chat/ChatInterface';
import Chatdashboard from './pages/AI/pages/DashboardPage';
import Analytics from './pages/lawfirm/(dashboard)/Analytics';
import OverallAnalytics from './pages/lawfirm/(dashboard)/OverallAnalytics';
import Documents from './pages/lawfirm/(dashboard)/Documents';
import Templates from './pages/lawfirm/(dashboard)/LegalTemplates';
import Knowledge from './pages/lawfirm/(dashboard)/KnowledgeHub';
import lawyerprofile from './pages/citizen/lawyers/lawyerprofile';
import ProfileInside from './pages/citizen/lawyers/lawyerprofile';
import TeamMemberDetails from './pages/citizen/lawyers/TeamMemberDetails';
import BookAppointment from './pages/citizen/lawyers/BookAppointment';
import LegalDocumentTemplates from './pages/AI/components/Chat/docgen/overalllegaldoctemplates';
import QnaScreen from './pages/AI/components/QNA/OverallQnaScreen';
import FloatingButton from './FAB';
import CaseDetails from './pages/lawfirm/(dashboard)/CaseDetails';
import ClientDashboard from "./pages/citizen/citizendashboard/DashboardLayout";
import CaseDocuments from './pages/lawfirm/(dashboard)/CaseDocuments/CaseDocuments';
import SignOut from './pages/authentication/SignOut';
import HearingSchedulesPage from './pages/lawfirm/(dashboard)/HearingSchedules/HearingSchedulesPage';
import Ocr from './pages/AI/components/Chat/Ocr';
import ClaimPredictor from './pages/lawfirm/(dashboard)/ClaimPredictor';
function App() {
  const [theme, colorMode] = useMode();

  const authRoutes = [
    '/',
    '/signin',
    '/lawfirmsignup',
    '/corporatesignup',
    '/otp',
    '/citizensignup',
    '/chatdashboard',
    '/landing',
  ];

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Introduction />} />
            <Route path="/lawfirmsignup" element={<LawFirmSignUp />} />
            <Route path="/corporatesignup" element={<CorporateSignUp />} />
            <Route path="/signin" element={<LogIn />} />
            <Route path="/otp" element={<EmailOTP />} />
            <Route path="/landing" element={<LawFirmLanding />} />
            <Route path="/addUser" element={<AddUser />} />
            <Route path="/addCase" element={<AddCase />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/citizenappointments" element={<CitizenAppointments />} />
            <Route path="/hearing" element={<HearingSchedulesPage/>} />
            <Route path="/citizenhearing" element={<CitizenHearing />} />
            <Route path="/AI" element={<AskAI />} />
            <Route path="/convoagent" element={<ConvoAgent />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/ldashboard" element={<LDashboard />} />
            <Route path="/chat" element={<ChatAI />} />
            <Route path="/clients" element={<ClientsOverview />} />
            <Route path="/addclient" element={<AddClient />} />
            <Route path="/clientdetails" element={<ClientDetails />} />
            <Route path="/overallclient" element={<OverallClientDetails />} />
            <Route path="/overallprofile" element={<OverallProfile />} />
            <Route path="/overallcases" element={<OverallCases />} />
            <Route path="/citizencases" element={<CitizenCases />} />
            <Route path="/chatinterface" element={<ChatInterface />} />
            <Route path="/chatdashboard" element={<Chatdashboard />} />
            <Route path="/analytics" element={<OverallAnalytics />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/lawyerprofile" element={<lawyerprofile />} />
            <Route path="/citizensignup" element={<CitizenSignUp />} />
            <Route path="/lawyers" element={<Lawyers />} />
            <Route path="/viewteamlawfirm/:lawFirmId" element={<ViewTeam />} />
            <Route path="/team-member-details/:memberId" element={<TeamMemberDetails />} />
            <Route path="/law-firm/:id" element={<ProfileInside />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/legaldoctemplates" element={<LegalDocumentTemplates />} />
            <Route path="/qnascreen" element={<QnaScreen />} />
            <Route path="/casedetails/:id" element={<CaseDetails />} />
            <Route path="/cdashboard" element={<ClientDashboard />} />
            <Route path="/casedocuments" element={<CaseDocuments />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/ocr" element={<Ocr />} />
            <Route path="/claim" element={<ClaimPredictor />} />


          </Routes>

          {!authRoutes.includes(window.location.pathname) && <FloatingButton />}
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
