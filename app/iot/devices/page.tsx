'use client'
// Chakra imports
import { Box, Flex, Text, Icon, useColorModeValue, Checkbox, Table, Thead, Th, Tr, Tbody, Td, filter } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import IconBox from 'components/icons/IconBox';

import { useState, useEffect } from 'react';

import { filterDevices, filterNotification } from 'app/filter';

import DeviceCard from 'views/iot/devices/DeviceCard'

// Assets
import * as React from 'react';

import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';
import deviceData, { DevObj } from 'data/deviceData';

type RowObj = {
    id: number;
    name: string;
    type: string;
    room: string;
    watt: number;
    status: boolean;
	user: string;
};


const columnHelper = createColumnHelper<RowObj>();


export default function Conversion() {
  const [Devices, setstate] = useState(null);
  useEffect(() => {
    setstate(null);
    filterDevices().then(value=>{
        setstate(value)
    })
    },[]);

	const [Notifications, setnotificationstate] = useState(null);
	useEffect(() => {
		setstate(null);
		filterNotification().then(value => {
			setnotificationstate(value)
		})
	},[]);



	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'navy.700');
	const brandColor = useColorModeValue('brand.500', 'brand.400');
  if (Devices === undefined  || Notifications === undefined){
    return(
      <Card p='100px' alignItems='center' flexDirection='column' w='100%' gap='20px'>
			<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%' gap='20px'>
			</Text>
			<Text>
			ur fucked
			</Text>
			</Card>
    )
  }
  else if(Devices === null || Notifications === null){
	return(
		<Card p='100px' alignItems='center' flexDirection='column' w='100%' gap='20px'>
			  <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%' gap='20px'>
			  </Text>
			  <Text>
			  loading
			  </Text>
			  </Card>
	  )
}
  else {
	return(
		<Card p='100px' alignItems='center' flexDirection='column' w='100%' gap='20px'>
				{Devices.map((device:DevObj)=> {
					return DeviceCard({device: device.device, deviceData: device, notifications:Notifications.devdata})
				})}
			  </Card>
	  )
  }
};