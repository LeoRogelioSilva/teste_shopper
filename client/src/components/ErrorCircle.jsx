import { Box, Tooltip, Flex, Center } from "@chakra-ui/react";

const ErrorCircle = ({ color, description }) => {
  return (
    <Tooltip label={description} placement="top" hasArrow>
      <Box
        width="20px"
        height="20px"
        borderRadius="50%"
        backgroundColor={color}
        marginRight="10px"
        cursor="pointer"
      ></Box>
    </Tooltip>
  );
};

const ErrorCircles = () => {
  return (
    <Flex gap={4} my="20px" alignItems="center" justifyContent="center">
      <ErrorCircle
        color="#8B0000"
        description="Não tem code ou price"
      />
      <ErrorCircle
        color="#FFA500"
        description="Não encontrado no BD"
      />
      <ErrorCircle
        color="#0000AA"
        description="Preços não válidos"
      />
      <ErrorCircle
        color="#FF1493"
        description="Valor fora do limite"
      />
    </Flex>
  );
};

export default ErrorCircles;
