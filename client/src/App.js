import Homepage from './components/Homepage/Homepage.js'
import Navbar from './components/Navbar/Navbar.js'
import Footer from './components/Footer/Footer.js'
import Profile from './components/Profile/Profile.js'
import HowItWorks from './components/HowItWorks/HowItWorks.js'
import LogInPage from './components/LogInPage/LogInPage.js'
import Register from './components/RegisterPage/RegisterPage.js'
import LinkAccount from './components/LinkAccount/LinkAccount.js'
import { Routes, Route } from "react-router-dom"
import './app.css'


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/link-account" element={<LinkAccount />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
