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
  cookieStorageManager,
  Card,
  Switch,
  Heading,
  CardHeader,
} from '@chakra-ui/react';

import{ User } from 'users/userobject';
import userList from 'users/userobject';
import { cookies } from 'next/headers';

import { createUser} from 'app/actions'

import { myFileCreator, myFileRead, getSettingsFile, saveSettings, getDevicesSettings, saveDeviceSettings } from 'app/fileactions';
import { useEffect, useState } from 'react';

import { getUserCookie } from 'app/actions';

import SettingsMenu from 'components/menu/SettingsMenu'

import { Settings } from 'settings/users/settingstype';
import { read } from 'fs';
import { DeviceSettingsType } from 'settings/devices/devicesettingstype';



const array = [0]



export default function dashboard({}) {
  const textColor = 'blue'
  const [readfile, setfilestate] = useState(null);
  const [readdevices, setdevicestate] = useState(null);
  const [filterstate, setfilterstate] = useState<string>('doorbell')
  useEffect(() => {
    setfilestate(null);
    getSettingsFile().then((value)=>setfilestate(value));
  },[]);
  useEffect(()=>{
    setdevicestate(null);
    getDevicesSettings().then((value)=>setdevicestate(value));
  },[]);

  function changeDisplay(state:string) {
    setfilterstate(state);
  }
  
  if(readfile === null || readdevices === null){
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
  else{

    const data : Settings = JSON.parse(readfile);
    var notifications = data.Notifications;
    const notificationkeys = Object.keys(notifications) as Array<keyof typeof notifications>;
    var devicegen = data.Devices;
    const devicekeysgen = Object.keys(devicegen) as Array<keyof typeof devicegen>;


    var newdevicesettings : DeviceSettingsType[] = [];
    var names : string[] = []

    for (const obj  of readdevices){
      names = names.concat([obj.devicename]);
      newdevicesettings = newdevicesettings.concat([obj.settings])
    }

    const devicesettings : DeviceSettingsType[] = [... newdevicesettings];
  


    return(
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
          <SimpleGrid        
          columns={{ base: 2, md: 2, lg: 2, '2xl': 6 }}
          gap="20px"
          mb="20px">
        
        <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="top"
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '14vh' }}
        flexDirection="column"
        gap="50px"
      >
        <Heading>
          Notification Settings
        </Heading>

        { notificationkeys.map((key)=>{
          var value = notifications[key];
          return(
            <Text>
            {key}
            <Switch id={key} defaultChecked={Boolean(value)} onChange={()=>{value=!value; notifications[key] = value; console.log('clicked')}}></Switch>
            </Text>
          )
        })}
        </Flex>

        <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="top"
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '14vh' }}
        flexDirection="column"
        gap="50px"
      >
        <Heading>
          Device Settings
        </Heading>
        <Text color={textColor}>
          General Settings
        </Text>

        { devicekeysgen.map((key)=>{
          var value = devicegen[key];
          return(
            <Text>
            {key}
            <Switch id={key} defaultChecked={value} onChange={()=>{value=!value; devicegen[key] = value}}></Switch>
            </Text>
          )
        })}

        <Text color={textColor}>
          Device Settings <SettingsMenu devicenames={names} changestate={changeDisplay} />
        </Text>

      { array.map( () => {
          const ind = names.indexOf(filterstate);
          if ( ind == -1){
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
          else{
            const device = devicesettings[ind];
            const devicekeys = Object.keys(device) as Array<keyof typeof device>;
            return(
              <Flex         flexDirection="column">
                <Text color={textColor}>
                  {names[ind]}  
                </Text>
                {devicekeys.map((key)=>{
                var value = device[key];
                return(

                  <Flex    
                  gap="10px"   >
                  <Text>
                    {key}
                    </Text>
                    <Switch id={key} defaultChecked={value} onChange={()=>{value=!value; newdevicesettings[ind][key]=value}}></Switch>
      
                  </Flex>
            )
          })
        }
        </Flex>
        )}
      })
    }

        {/* // {devicesettings.map((device,index)=>{
        //   const devicekeys = Object.keys(device) as Array<keyof typeof device>;
        //   return(
        //     <Flex>
        //       <Text color={textColor}> {names[index]} </Text>
        //       {devicekeys.map((key)=>{
        //         var value = device[key];
        //         return(
        //           <Text>
        //             {key}
        //             <Switch id={key} defaultChecked={value} onChange={()=>{value=!value; newdevicesettings[index][key]=value}}></Switch>
        //           </Text>
        //         )
        //       })}

        //     </Flex>
        //   )
        // })} */}


        </Flex>



        </SimpleGrid>

        <Button onClick={()=>{saveSettings({Notifications:notifications,Devices:devicegen}); saveDeviceSettings(newdevicesettings); 
          }
        }> Save </Button>
        
    </Box>
    )
  }
}




// return(
//   <Box>
//     hi
//   </Box>
// )

  // useEffect(() => {
  //   setuser(null);
  //   getUserCookie().then((value)=>setuser(value));
  // },[]);

  // if (user === null){
  //   return(
  //     <Card p='100px' alignItems='center' flexDirection='column' w='100%' gap='20px'>
  //         <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%' gap='20px'>
  //         </Text>
  //         <Text>
  //         loading
  //         </Text>
  //         </Card>
  //     )
  // };

  // useEffect(() => {
  //   setfilestate(null);
  //   if (user !== null){
  //     console.log('hi');
  //     myFileRead(user.settings).then((value)=>setfilestate(value));
  //   }
  // },[]);

  // if(readfile === undefined){
  //   useEffect(() => {
  //     settemplate(null);
  //     myFileRead('/settings/template.json').then((value)=>settemplate(value));
  //   },[]);

  //   if(template === null){
  //     return(
  //       <Card p='100px' alignItems='center' flexDirection='column' w='100%' gap='20px'>
  //           <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%' gap='20px'>
  //           </Text>
  //           <Text>
  //           loading 1
  //           </Text>
  //           </Card>
  //       )

  //   };

  //   if(template === undefined){
  //     return(
  //       <Card p='100px' alignItems='center' flexDirection='column' w='100%' gap='20px'>
  //           <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%' gap='20px'>
  //           </Text>
  //           <Text>
  //           ur fucked
  //           </Text>
  //           </Card>
  //       )
  //   }

  //   setfilestate(template);

  // };

  // if(readfile === null){
  //   return(
	// 		<Card p='100px' alignItems='center' flexDirection='column' w='100%' gap='20px'>
	// 			  <Text  fontSize='22px' fontWeight='700' lineHeight='100%' gap='20px'>				  
  //         </Text>
	// 			  <Text>
	// 			  loading 2
	// 			  </Text>
	// 			  </Card>
	// 	  )
  // };


