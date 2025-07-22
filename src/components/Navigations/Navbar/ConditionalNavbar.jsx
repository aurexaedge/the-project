'use client';

import Navbar from './Navbar';
import Footer from '../Footer/Footer';
import { usePathname } from 'next/navigation';
import NavbarNew from './NavbarNew';

const ConditionalNavbar = ({ children }) => {
  const pathname = usePathname();
  const regex = new RegExp('/user/*');
  const regexa = new RegExp('/auth/*');

  return (
    <>
      {/* {regex.test(pathname) || regexa.test(pathname) ? null : <Navbar />} */}
      {regex.test(pathname) || regexa.test(pathname) ? null : <NavbarNew />}
      {children}
      {regex.test(pathname) || regexa.test(pathname) ? null : <Footer />}
    </>
  );
};

export default ConditionalNavbar;
