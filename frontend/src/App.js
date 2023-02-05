import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Header from './components/header/Header';
import FormDetails from "./pages/FormDetails/FormDetails";
import FormList from "./pages/FormList/FormList";
import Home from './pages/Home/Home';
function App() {
  return (
    <>
      <Header />
      <Routes>

        <Route exact path='/form-list' element={<FormList />} />
        <Route exact path='/:id/form-detail' element={<FormDetails />} />
        <Route exact path='/' element={<Home />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
