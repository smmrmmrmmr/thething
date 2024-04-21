//'use client'

import {
  Portal,
  Box,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import type { Metadata } from 'next'
import Footer from 'components/footer/FooterAdmin';
// Layout components
import Navbar from 'components/navbar/NavbarAdmin';
import Sidebar from 'components/sidebar/Sidebar';
import { SidebarContext } from 'contexts/SidebarContext';
import { PropsWithChildren, useEffect, useState } from 'react';
import routes from 'routes';
import {
  getActiveNavbar,
  getActiveNavbarText,
  getActiveRoute,
} from 'utils/navigation';


// interface DashboardLayoutProps extends PropsWithChildren {
//   [x: string]: any;
// }

export const metadata: Metadata = {
  title: 'Diss Project',
  description: 'woop woop',
}


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id={'root'}>
        <AppWrappers>{children}</AppWrappers>
      </body>
    </html>
  );
}
