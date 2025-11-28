import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Screens/Navbar/Navbar";
import ProtectedRoutes from "./components/utils/PrivateRoutes";
import AdminRoutes from "./components/utils/AdminRoutes";
import Error from "./components/Error";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";

// Lazy load screens
const HomeScreen = lazy(() => import("./components/Home/HomeScreen"));
const Bookings = lazy(() => import("./components/Bookings"));
const Books = lazy(() => import("./components/Books"));
const IPC = lazy(() => import("./components/IPCs and CRPCs/IPC"));
const LawyersList = lazy(() => import("./components/Lawyers/LawyersList"));
const Article = lazy(() => import("./components/BlogCRUD/Article/Article"));
const PracticeOverview = lazy(() => import("./components/Lawyers/PracticeOverview"));
const LoginPage = lazy(() => import("./components/LoginPage"));
const Blog = lazy(() => import("./components/BlogCRUD/Article/Blog"));
const Signup = lazy(() => import("./components/Signup"));
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const ClientDashboard = lazy(() => import("./components/Dashboard/ClientDashboard"));
const CaseDetails = lazy(() => import("./components/Cases/CaseDetails"));
const MyBookings = lazy(() => import("./components/MyBookings"));
const CalendarView = lazy(() => import("./components/Calendar/CalendarView"));
const GeminiAi = lazy(() => import("./components/GeminiAI/GeminiAi"));
const AdminDashboard = lazy(() => import("./components/Admin/AdminDashboard"));

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <>
            <Navbar />
            <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
              <Routes>
              <Route path={"/"} element={<HomeScreen />} />
              <Route path={"/login"} element={<LoginPage />} />
              <Route path={"/signup"} element={<Signup />} />
              <Route path={"/bookings"} element={<Bookings />} />
              <Route path={"/books"} element={<Books />} />
              <Route path={"/services/ipc&crpcs"} element={<IPC />} />
              <Route path={"/blogs"} element={<Blog />} />
              <Route path={"/blog/:id"} element={<Article />} />
              <Route path={"/lawyersList"} element={<LawyersList />} />
              <Route element={<ProtectedRoutes />}>
                <Route path={"/lawyer-dashboard"} element={<Dashboard />} />
                <Route path={"/client-dashboard"} element={<ClientDashboard />} />
                <Route path={"/case-details/:caseId"} element={<CaseDetails />} />
                <Route path={"/my-bookings"} element={<MyBookings />} />
                <Route path={"/calendar"} element={<CalendarView />} />
              </Route>
              <Route element={<ProtectedRoutes />}>
                <Route
                  path={"/lawyerListOverview/:id"}
                  element={<PracticeOverview />}
                />
              </Route>

              <Route element={<AdminRoutes />}>
                <Route path={"/admin"} element={<AdminDashboard />} />
              </Route>

              <Route path={"*"} element={<Error />} />
              <Route path={"/gemini"} element={<GeminiAi />} />
              </Routes>
            </Suspense>
          </>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
