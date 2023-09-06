import { List, ListIcon, Tab, TabList, TabPanel, TabPanels, Tabs, ListItem } from "@chakra-ui/react"
import { EmailIcon, StarIcon, ChatIcon, CheckCircleIcon, WarningIcon } from "@chakra-ui/icons"

export default function Home() {
  return (
    <Tabs mt="40px" p="20px" colorScheme="purple" variant="enclosed">
      <TabList>
        <Tab _selected={{ color: "white", bg: "purple.400" }}>
          Account Info
        </Tab>
        <Tab _selected={{ color: "white", bg: "purple.400" }}>
          Task History
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <List spacing={4}>
            <ListItem>
              <ListIcon as={EmailIcon} />
                Email: miau@gmail.com
            </ListItem>
            <ListItem>
              <ListIcon as={ChatIcon} />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quo pariatur facere consequatur voluptatum explicabo consectetur illo, distinctio, dolore corporis assumenda maiores cumque tempore error accusantium quod laudantium, nisi exercitationem!
            </ListItem>
            <ListItem>
              <ListIcon as={StarIcon} />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non eaque nesciunt sint. Excepturi dolor natus, vero necessitatibus voluptates laboriosam. Veritatis quos voluptatem dolorem dolor molestiae ea praesentium voluptates, itaque recusandae.
            </ListItem>
          </List>
        </TabPanel>
        <TabPanel>
        <List spacing={4}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="teal.400" />
                Email: miau@gmail.com
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="teal.400"  />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quo pariatur facere consequatur voluptatum explicabo consectetur illo, distinctio, dolore corporis assumenda maiores cumque tempore error accusantium quod laudantium, nisi exercitationem!
            </ListItem>
            <ListItem>
              <ListIcon as={WarningIcon} color="red.400"  />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non eaque nesciunt sint. Excepturi dolor natus, vero necessitatibus voluptates laboriosam. Veritatis quos voluptatem dolorem dolor molestiae ea praesentium voluptates, itaque recusandae.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="teal.400"  />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quo pariatur facere consequatur voluptatum explicabo consectetur illo, distinctio, dolore corporis assumenda maiores cumque tempore error accusantium quod laudantium, nisi exercitationem!
            </ListItem>
            <ListItem>
              <ListIcon as={WarningIcon} color="teal.400"  />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non eaque nesciunt sint. Excepturi dolor natus, vero necessitatibus voluptates laboriosam. Veritatis quos voluptatem dolorem dolor molestiae ea praesentium voluptates, itaque recusandae.
            </ListItem>
          </List>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
