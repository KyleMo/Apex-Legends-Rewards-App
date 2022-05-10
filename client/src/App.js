import Homepage from './components/Homepages/Homepage.js'
import Navbar from './components/Navbar/Navbar.js'
import Footer from './components/Footer/Footer.js'
import Profile from './components/Profile/Profile.js'
import HowItWorks from './components/HowItWorks/HowItWorks.js'
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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
