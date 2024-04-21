'use client'
/* HOME */

import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
  Link,
  Center,
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';

import { filterNotification } from 'app/filter';

import { Dev, Set } from 'views/iot/notifications/Notifications';

type SettingType = 'device'|'log'|'setting'



export default function dashboard({}) {
  // const textColor = useColorModeValue('secondaryGray.900', 'white');
  // const textColorBrand = useColorModeValue('brand.500', 'white');
  const textColor = 'blue'
  const [notificationData, setnotificationstate] = useState({devdata:null,setdata:null});
  useEffect(() => {
    filterNotification().then(value => {
      setnotificationstate(value)
    })
  },[]);
  
  return(
    <Box pt={{ base: '130px', md: '80px', xl: '80px' } }>
      <SimpleGrid        
        columns={{ base: 1, md: 2, lg:2, '2xl': 6 }}
        gap="20px"
        mb="20px"
        alignContent='centre'>

          <Dev tableData={notificationData.devdata}/>
          <Set tableData={notificationData.setdata}/>
           {/* <Notifications tableData={notificationData} column='device'/>
           <Notifications tableData={notificationData} column='log'/>
           <Notifications tableData={notificationData} column='setting'/> */}

        </SimpleGrid>
  </Box>
  )
}
