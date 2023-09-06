import { UnlockIcon } from '@chakra-ui/icons'
import { Avatar, AvatarBadge, Box, Button, Flex, HStack, Heading, Spacer, Text, useToast } from '@chakra-ui/react'
import React from 'react'

export default function NavBar() {

    return (
        <Flex as="nav" p="10px" mb="40px" alignItems="center" gap="30px">
            <Heading as="h1">
                Shopper Test
            </Heading>
            <Spacer>

            </Spacer>

            <HStack spacing="20px">
                <Text>
                </Text>
            </HStack>

        </Flex>
    )
}
