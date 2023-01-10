import {
  AiOutlineGoogle,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillYoutube,
} from 'react-icons/ai'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="social-media-icons-container">
      <AiOutlineGoogle className="social-media-icons" />
      <AiOutlineTwitter className="social-media-icons" />
      <AiOutlineInstagram className="social-media-icons" />
      <AiFillYoutube className="social-media-icons" />
    </div>
    <p className="contact-us-text">Contact Us</p>
  </div>
)

export default Footer
