import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-2">Property Deller</h2>
          <p className="text-gray-400">
            Your trusted platform to predict property prices accurately and make smarter real estate decisions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-2">Quick Links</h2>
          <ul className="text-gray-400">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/predict" className="hover:text-white">Predict Price</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-bold mb-2">Contact Us</h2>
          <p className="text-gray-400">Email: support@propertydeller.com</p>
          <p className="text-gray-400">Phone: +91 9876543210</p>
          <p className="text-gray-400">Address: 123 Main Street, Your City, India</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Property Deller. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
