import { Flex, Button, Text, Center, Grid, Input, InputGroup, InputRightElement, InputLeftElement, Box } from "@chakra-ui/react"
import { EmailIcon } from "@chakra-ui/icons"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

import { useState, useRef } from 'react';
import CSVDataTable from "../components/CSVDataTable";


export default function Home() {
  const [csvData, setCsvData] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const csvText = e.target.result;
        parseCSV(csvText);
      };

      reader.readAsText(file);
    }
  };

  const parseCSV = (csvText) => {
    const lines = csvText.split("\n");
    const headers = lines[0].split(",");
    const parsedData = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(",");

      if (currentLine.length === headers.length) {
        const row = {};
        for (let j = 0; j < headers.length; j++) {
          row[headers[j].trim()] = currentLine[j].trim();
        }
        parsedData.push(row);
      }
    }

    setCsvData(parsedData);
  };


  const inputStyle = {

  };

  return (
    <Grid alignItems="center" justifyContent="center"  templateColumns='repeat(2, 1fr)' gap={6}>
      <Box>
        <input style={{ marginBottom: "20px" }}
          type="file"
          onChange={handleFileChange}
          accept=".csv"
        />
      </Box>
      <Box mb="20px">
        <Button>
          <Text>Atualizar</Text>
        </Button>
      </Box>
      <Box>
      <CSVDataTable data={csvData} />
      </Box>
    </Grid>
  )
}