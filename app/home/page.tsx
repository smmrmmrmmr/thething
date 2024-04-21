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
export default function dashboard({}) {
  // const textColor = useColorModeValue('secondaryGray.900', 'white');
  // const textColorBrand = useColorModeValue('brand.500', 'white');
  const textColor = 'blue'
  
  return(
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
    <Box>

    <Text
    mt="45px"
    mb="36px"
    color={textColor}
    fontSize="2xl"
    ms="24px"
    fontWeight="700"
  >
    Recently Added
  </Text>
  </Box>
  </Box>
  )
}
