import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './Component/Home';
import Detail from "../src/pages/Detail";
import Detail2 from "../src/pages/Detil2";
import AboutUs from './pages/AboutUs';
import Sedan from './pages/sedan';
import Suv from './pages/suv';
import Sports from './pages/Sports';
import Mycars from './pages/mycars';
import CarListingForm from './pages/CarListingForm'; 
import ContactPage from './pages/ContactUs';
import Header from './Component/Header';
import HeaderAdmin from './Component/HeaderAdmin';
import Footer from './Component/Footer';
import Admin from './Dashboard/Admin';
import AllUsers from './Dashboard/AllUsers';
import AdminRegister from './Dashboard/AdminRegisterPage';
import UserList from './Dashboard/UserList';
import Allcars from './Dashboard/allcars';
import CategoryManagement from './Dashboard/Category';
import ItemManagement from './Dashboard/Item';
import TermsAndConditions from './pages/TermsAndConditions';
import ReviewNewItem from './Dashboard/ReviewNewItem';
import Login from './pages/Login';
import RegisterPage from './pages/Register';
import AdminLoginPage from './Dashboard/AdminLoginPage';
import CarCatalog from './pages/CarCatalog';
import PrivateRoute from './Component/PrivateRoute'; 
import PrivateRouteAdmin from './Component/PrivateRouteAdmin'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/aboutUs" element={<PrivateRoute><AboutUs /></PrivateRoute>} />
          <Route
            path="/sedan"
            element={
              <PrivateRoute>
                <Sedan />
              </PrivateRoute>
            }
          />
          <Route
            path="/suv"
            element={
              <PrivateRoute>
                <Suv />
              </PrivateRoute>
            }
          />
          <Route
            path="/sports"
            element={
              <PrivateRoute>
                <Sports />
              </PrivateRoute>
            }
          />
          <Route
            path="/carListingForm"
            element={
              <PrivateRoute>
                <CarListingForm />
              </PrivateRoute>
            }
          />
          <Route path="/contactPage" element={<PrivateRoute><ContactPage /></PrivateRoute>} />
          <Route path="/termsAndConditions" element={<TermsAndConditions />} />
          <Route path='/AdminLoginPage' element={<AdminLoginPage />} />
          <Route path='/AdminRegisterPage' element={<PrivateRouteAdmin><AdminRegister /></PrivateRouteAdmin>} />
          {/* add admin  */}
          <Route path='/AllUsers' element={<PrivateRouteAdmin><AllUsers /></PrivateRouteAdmin>} />
          <Route path='/Allcars' element={<PrivateRouteAdmin><Allcars /></PrivateRouteAdmin>} />
          <Route path="/ReviewNewItem" element={
        <PrivateRouteAdmin><ReviewNewItem /></PrivateRouteAdmin>
        } />
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/detailPage"
            element={
              <PrivateRoute>
                <Detail />
              </PrivateRoute>
            }
          />
          <Route
            path="/detailPage2"
            element={
              <PrivateRoute>
                <Detail2 />
              </PrivateRoute>
            }
          />
          <Route path="/admin" element={<PrivateRouteAdmin><Admin /></PrivateRouteAdmin>} />
          <Route path="/HeaderAdmin" element={<PrivateRouteAdmin><HeaderAdmin /></PrivateRouteAdmin>} />
          <Route path="/userList" element={<PrivateRouteAdmin><UserList /></PrivateRouteAdmin>} />
          <Route path="/categoryManagement" element={<CategoryManagement />} />
          <Route path="/itemManagement" element={<ItemManagement />} />
          <Route path="/carlist" element={<CarCatalog />} />
          <Route path="/Header" element={<PrivateRoute><Header /></PrivateRoute>} />
          <Route path="/Mycars" element={<PrivateRoute><Mycars /></PrivateRoute>} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
