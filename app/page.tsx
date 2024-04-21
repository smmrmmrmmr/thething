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
import { redirect } from 'next/navigation';
import Card from 'components/card/Card';
export default function Home({}) {
  // const textColor = useColorModeValue('secondaryGray.900', 'white');
  // const textColorBrand = useColorModeValue('brand.500', 'white');
  const textColor = 'blue'
  

  redirect('/auth/sign-in');
  return(
    <main>
    <p>boobs</p>

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
  </main>
  )
}

