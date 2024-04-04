import React from 'react';

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between p-4 bg-gray-800 text-white'>
      <div className='text-2xl font-bold'>Amazon Price Tracker</div>
      <ul className='flex gap-5'>
        <li className='hover:text-gray-300'>Home</li>
        <li className='hover:text-gray-300'>About</li>
        <li className='hover:text-gray-300'>Contact</li>
      </ul>
    </nav>
  );
};

export default Navbar;
