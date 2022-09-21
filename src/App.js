import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { SkeletonTheme } from "react-loading-skeleton";
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

function App() {
  return (
    <Router>
      <>
        <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
          <Navbar />
          <Routes>
            <Route path={"/"} element={<HomeScreen />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/bookings"} element={<Bookings />} />
            <Route path={"/books"} element={<Books />} />
            <Route path={"/services/ipc&crpcs"} element={<IPC />} />
            <Route path={"/lawyersList"} element={<LawyersList />} />
            <Route path={"/blogs"} element={<Blog />} />
            <Route path={"/article/:name"} element={<Article />} />
            <Route element={<ProtectedRoutes />}>
              <Route
                path={"/lawyerListOverview/:id"}
                element={<PracticeOverview />}
              />
            </Route>

            <Route path={"*"} element={<Error />} />
          </Routes>
        </SkeletonTheme>
      </>
    </Router>
  );
}

export default App;
