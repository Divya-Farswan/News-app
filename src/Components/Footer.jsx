// Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} NewsApp. All Rights Reserved.</p>
        
      

        {/* Social Media Icons */}
        <div className="mt-2">
          <a href="#" className="text-light mx-2">
            <i className="fab fa-facebook fa-lg"></i>
          </a>
          <a href="#" className="text-light mx-2">
            <i className="fab fa-twitter fa-lg"></i>
          </a>
          <a href="#" className="text-light mx-2">
            <i className="fab fa-instagram fa-lg"></i>
          </a>
          <a href="#" className="text-light mx-2">
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
