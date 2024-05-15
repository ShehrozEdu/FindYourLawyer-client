import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
//Screens
import HomeScreen from "./components/Home/HomeScreen";
import Bookings from "./components/Bookings";
import Books from "./components/Books";
import Navbar from "./Screens/Navbar/Navbar";
import IPC from "./components/IPCs and CRPCs/IPC";
import LawyersList from "./components/Lawyers/LawyersList";
import Article from "./components/BlogCRUD/Article/Article";
import Error from "./components/Error";
import PracticeOverview from "./components/Lawyers/PracticeOverview";
import ProtectedRoutes from "./components/utils/PrivateRoutes";
import LoginPage from "./components/LoginPage";
import Blog from "./components/BlogCRUD/Article/Blog";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import GeminiAi from "./components/GeminiAI/GeminiAi";

function App() {
  return (
    <Router>
      <>
        <Navbar />
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
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route
              path={"/lawyerListOverview/:id"}
              element={<PracticeOverview />}
            />
          </Route>

          <Route path={"*"} element={<Error />} />
          <Route path={"/gemini"} element={<GeminiAi />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
