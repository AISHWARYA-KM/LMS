import React from 'react';
import { FaFacebook, FaYoutube, FaTwitter, FaLinkedin, FaHeadset,FaArrowUp, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="main-footer">
    <div className="footer-top">
      <div className="footer-col">
        <h3>About</h3>
        <p className="highlight">Never Miss A Post!</p>
        <p>Choose the most powerful courses and always be on demand</p>
        <div className="subscribe">
          <input type="email" placeholder="Enter e-mail Address" />
          <button>SUBSCRIBE</button>
        </div>
      </div>

      <div className="footer-col">
        <h3>Support Zone</h3>
        <ul>
          <li>Unlock Your Potential</li>
          <li>Privacy policy and cookie policy</li>
          <li>Sitemap</li>
          <li>Featured courses</li>
          <li>Join Us</li>
        </ul>
      </div>

      <div className="footer-col">
        <h3>Company Info</h3>
        <ul>
          <li>Learn with InfixLMS</li>
          <li>Teach on InfixEdu</li>
          <li>Get the app</li>
          <li>About us</li>
          <li>Contact us</li>
        </ul>
      </div>

      <div className="footer-col">
        <h3>Explore Services</h3>
        <ul>
          <li>Careers</li>
          <li>Blog</li>
          <li>Help and Support</li>
          <li>Terms</li>
          <li>Certificate Verification</li>
          <li>Free Course</li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
  <div className="footer-bottom-grid">
    {/* Contact Section */}
    <div className="footer-bottom-item contact-info">
      <FaHeadset className="icon" />
      <div>
        <p>CALL US 24/7</p>
        <h4>+968 9700 2784</h4>
      </div>
    </div>

    {/* Address */}
    <div className="footer-bottom-item location">
      <p>Al Khuwair, Muscat, Oman</p>
      <a href="mailto:hello@aorasoft.com">hello@aorasoft.com</a>
    </div>

    {/* Social Media */}
    <div className="footer-bottom-item follow">
      <p className="bold">FOLLOW US</p>
      <div className="social-icons">
        <FaFacebook />
        <FaYoutube />
        <FaTwitter />
        <FaLinkedin />
      </div>
    </div>

    {/* Payment Methods */}
    <div className="footer-bottom-item payment">
      <p className="bold">PAYMENT METHOD</p>
      <div className="payment-icons">
        <img src="/icons/paypal.png" alt="paypal" />
        <img src="/icons/stripe.png" alt="stripe" />
        <img src="/icons/paystack.png" alt="paystack" />
        <img src="/icons/razorpay.png" alt="razorpay" />
        <img src="/icons/paytm.png" alt="paytm" />
        <img src="/icons/mollie.png" alt="mollie" />
        <img src="/icons/mastercard.png" alt="mastercard" />
        <img src="/icons/ccavenue.png" alt="ccavenue" />
      </div>
    </div>
    <div className="floating-buttons">
        <a href="https://wa.me/9686497890" className="whatsapp" target="_blank" rel="noreferrer">
          <FaWhatsapp />
        </a>
        <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <FaArrowUp />
        </button>
      </div>
  </div>
</div>
</footer>
  );
};

export default Footer;