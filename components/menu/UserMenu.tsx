import React from 'react';

// Chakra imports
import {
	Icon,
	Flex,
	Text,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useDisclosure,
	useColorModeValue,
	Button,
} from '@chakra-ui/react';
// Assets
import {
	MdOutlineMoreHoriz,
	MdOutlinePerson,
	MdOutlineCardTravel,
	MdOutlineLightbulb,
	MdOutlineSettings
} from 'react-icons/md';

import { User } from 'users/userobject'

import { createUser} from 'app/actions'





export default function Banner(props : User) {
	//const {changestate} = props;
	const user = props
	const textColor = useColorModeValue('secondaryGray.500', 'white');
	const textHover = useColorModeValue(
		{ color: 'secondaryGray.900', bg: 'unset' },
		{ color: 'secondaryGray.500', bg: 'unset' }
	);
	const iconColor = useColorModeValue('brand.500', 'white');
	const bgList = useColorModeValue('white', 'whiteAlpha.100');
	const bgShadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.08)', 'unset');
	const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
	const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });

	// Ellipsis modals
	const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();


	

	return (
			<Button key={user.id}
			onClick={() => createUser(user)}>
				{ user.name }
			</Button>
	);
}
