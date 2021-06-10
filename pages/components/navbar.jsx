import { Box, Text, Button, Container, Flex, Center, Square, Stack } from "@chakra-ui/react";

function Navbar() {
  return (
    <div className="navbar">
      <Container maxW="container.md">
        <Flex h="75px">
          <Square w="100px">
            <Text>Logo</Text>
          </Square>
          <Box flex="1" />
          <Center w="500px">
            <Stack direction="row" spacing={1} align="center">
              <Button colorScheme="teal" variant="ghost" size="sm">
                Home
              </Button>
              <Button colorScheme="teal" variant="ghost" size="sm">
                Announcement
              </Button>
              <Button colorScheme="teal" variant="ghost" size="sm">
                Registration
              </Button>
              <Button colorScheme="teal" variant="ghost" size="sm">
                Submission
              </Button>
              <Button colorScheme="teal" variant="ghost" size="sm">
                Contact Us
              </Button>
            </Stack>
          </Center>
        </Flex>
      </Container>
    </div>
  );
}

export default Navbar;
