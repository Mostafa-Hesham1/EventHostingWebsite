import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import ResponsiveAppBar from "./components/Demo.tsx";
import HomePage from "./components/HomePage.js";
import Events from "./components/Events/Events.js";
import Admin from "./components/Admin/Admin.js";
import AboutUs  from "./components/AboutUs.js";
import Contact from "./components/Contactus.js";
import SignUp from "./components/sign-up/SignUp.js";
import SignInSide from "./components/sign-in-side/SignInSide.js";
import Footer from "./components/Footer.js";
import Pricing from "./components/pricing.js"
import Dashboard from './components/Dashboard/Dashboard.js';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ManageEvents from './components/Dashboard/MangeEvents.js';
import AddEventForm from './components/Dashboard/AddEventForm.js';
import ProtectedRoute from './components/ProtectedRoute';
import EventDetail from './components/Events/EventDetail'; 
import Checkout from './components/checkout/Checkout.js';
import PhoneVerification from './components/checkout/PhoneVerification.js'; // Import the PhoneVerification component
import UserBookings from './components/BookingsPage.js';
import ManageUsers from './components/Dashboard/ManageUsers.js';
import UpdateEventForm from './components/Dashboard/UpdateEvent.js';
import  TermsofService  from './components/TermsofService.js';
import PrivacyPolicy from './components/PrivacyPolicy.js';
import  HowItWorks  from './components/HowItWorks.js';
import FAQs  from './components/FAQs.js';


const theme = createTheme({
  palette: {
    background: {
      default: "rgb(16, 20, 25)"
    }
  }
});
function App() {
  const location = useLocation();
  const hideNavAndFooter = location.pathname.includes('/signup') || 
                           location.pathname.includes('/signin') || 
                           location.pathname.includes('/dashboard') || 
                           location.pathname.startsWith('/checkout/')||location.pathname.startsWith('/Manage-event')||location.pathname.startsWith('/checkout/')||location.pathname.startsWith('/Manage-user');

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!hideNavAndFooter && <ResponsiveAppBar />}
        <section>
          <Routes>
          <Route path="/" element={<HomePage/>} />

            <Route path="/homepage" element={<HomePage/>} />
            <Route path="/events" element={<Events/>} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/aboutUs" element={<AboutUs/>} />
            <Route path="/Contact" element={<Contact/>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignInSide />} />
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/events" element={<Events />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/Manage-event" element={<ManageEvents />} />    
            <Route path="/add-event" element={<AddEventForm />} />
            <Route path="/event/:id" element={<EventDetail />} /> 
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/phone-verification" element={<PhoneVerification />} /> 
            <Route path="/bookings" element={<UserBookings />} />
            <Route path="/Manage-user" element={<ManageUsers />} />    
            <Route path="/updateEvent/:eventId" element={<UpdateEventForm />} />
            <Route path="/termsofService" element={<TermsofService />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/howItWorks" element={<HowItWorks />} />
            <Route path="/faqs" element={<FAQs />} />


          </Routes>
        </section>
        {!hideNavAndFooter && <Footer />}
      </ThemeProvider>
    </div>
  );
}

export default App;
