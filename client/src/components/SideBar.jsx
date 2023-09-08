import { List, ListIcon, ListItem } from '@chakra-ui/react'
import { AtSignIcon, CalendarIcon, EditIcon } from "@chakra-ui/icons"
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function SideBar() {
    return (
        <List color="white" fontSize="1.2em" spacing={4}>
            <ListItem>
                <a href="https://github.com/LeoRogelioSilva/teste_shopper" target="_blank">
                    <ListIcon as={AtSignIcon} color="white" />
                    Repositório GitHub
                </a>

            </ListItem>
        </List>
    )
}
