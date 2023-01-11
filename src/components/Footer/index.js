import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="social-media-icons-container">
      <FaGoogle className="social-media-icons" />
      <FaTwitter className="social-media-icons" />
      <FaInstagram className="social-media-icons" />
      <FaYoutube className="social-media-icons" />
    </div>
    <p className="contact-us-text">Contact us</p>
  </div>
)

export default Footer
