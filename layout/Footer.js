import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t text-center text-sm py-3 mt-auto">
      © {new Date().getFullYear()} Clinique Vétérinaire — Tous droits réservés.
    </footer>
  );
};

export default Footer;
