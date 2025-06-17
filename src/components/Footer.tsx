import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white text-center p-3 mt-5">
      &copy; {new Date().getFullYear()} To-Do App Colaborativa
    </footer>
  );
};

export default Footer;
