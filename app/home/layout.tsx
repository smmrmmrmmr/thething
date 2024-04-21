'use client'

import {
  Portal,
  Box,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';
//import AppWrappers from '../../AppWrappers';
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


interface DashboardLayoutProps extends PropsWithChildren {
  [x: string]: any;
}

// export const metadata: Metadata = {
//   title: 'Diss Project',
//   description: 'woop woop',
// }


export default function DashboardLayout(props: DashboardLayoutProps) {//{ children }: { children: ReactNode }) {
  const { children, ...rest } = props;
  const bg = useColorModeValue('secondaryGray.300', 'navy.900');
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { onOpen } = useDisclosure();
  return (
    <Box h="100vh" w="100vw" bg={bg}>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar routes={routes} display="none" {...rest} />
      <Portal>
        <Box>
              <Navbar
                onOpen={onOpen}
                logoText={'ahhh'}
                brandText={getActiveRoute(routes)}
                secondary={getActiveNavbar(routes)}
                message={getActiveNavbarText(routes)}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>

          <Box
            mx="auto"
            p={{ base: '20px', md: '30px' }}
            pe="20px"
            minH="100vh"
            pt="50px"
          >
            {children}
          </Box>
          <Box>
            <Footer />
          </Box>

      </SidebarContext.Provider>
    </Box>
  );
}
