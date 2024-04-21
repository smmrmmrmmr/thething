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
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';

import { filterDevices, filterLog, filterNotification } from 'app/filter';

// import data

import { notificationDataSort } from 'data/notificationData';
// import notdevData from 'data/notdevData';
// import notsetData from 'data/notsetData';

// import deviceData from 'data/deviceData';

import Notifications from 'views/iot/dashboard/components/Notifications';

import Temperature from 'views/iot/dashboard/components/Temperature';

import ActiveDevices from 'views/iot/dashboard/components/ActiveDevices';

import Log from 'views/iot/dashboard/components/Log';
import logData from 'data/logData';

import Consumption from 'views/iot/dashboard/components/Consumption';

// const notificationData = notificationDataSort(notdevData,notsetData);

export default function dashboard({}) {
  const [deviceData, setdevicestate] = useState(null);
  useEffect(() => {
    setdevicestate(null);
    filterDevices().then(value=>{
      setdevicestate(value)
    })
    },[]);
  const [logData, setlogstate] = useState(null);
  useEffect(() => {
    setlogstate(null);
    filterLog().then(value=> {
      setlogstate(value)
      })
    },[]);
  const [notificationData, setnotificationstate] = useState(null);
  useEffect(() => {
    setnotificationstate(null);
    filterNotification().then(value => {
      setnotificationstate(notificationDataSort(value.devdata,value.setdata))
    })
  },[]);
  // const [notificationData, setnotificationstate] = useState(null);
  // useEffect(()  => {
  //   setnotificationstate(null);
  //   filterNotification().then(value =>{
  //     setnotificationstate(value)
  //   })
  // },[]);
  // const textColor = useColorModeValue('secondaryGray.900', 'white');
  // const textColorBrand = useColorModeValue('brand.500', 'white');
  const textColor = 'blue'
  
  return(
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid        
        columns={{ base: 1, md: 2, lg: 2, '2xl': 6 }}
        gap="20px"
        mb="20px">

        <Notifications tableData={notificationData}/>

        <SimpleGrid
          columns={{base: 1, md: 1, lg: 2, '2xl':6}}
          gap="20px"
          mb="20px">

          <ActiveDevices tableData={deviceData} />

          <Temperature />

        </SimpleGrid>

      </SimpleGrid>

      <SimpleGrid
        columns={{ base: 1, md: 1, lg: 2, '2xl': 6}}
        gap="20px"
        mb="20px">

        <Log tableData={logData} />


        <Consumption tableData={deviceData} />
      </SimpleGrid>



    {/* <Text
    mt="45px"
    mb="36px"
    color={textColor}
    fontSize="2xl"
    ms="24px"
    fontWeight="700"
  >
    Recently Addedjassssdhfdsaksakdkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
  </Text> */}
  </Box>
  )
}
