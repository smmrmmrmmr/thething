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
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          {/* <Portal>
            <Box>
              <Navbar
                onOpen={onOpen}
                logoText={'Horizon UI Dashboard PRO'}
                brandText={getActiveRoute(routes)}
                secondary={getActiveNavbar(routes)}
                message={getActiveNavbarText(routes)}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal> */}

          <Box
            mx="auto"
            p={{ base: '20px', md: '20px' }}
            pe="20px"
            minH="100vh"
            pt="20px"
          >
            {children}
          </Box>
          {/* <Box>
            <Footer />
          </Box> */}
        </Box>

      </SidebarContext.Provider>
    </Box>
  );
}
