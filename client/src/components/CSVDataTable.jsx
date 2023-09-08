import React, { useEffect, useState } from "react";
import api from '../services/api';
import { Box, Button, Flex, Grid, Tooltip } from "@chakra-ui/react";
import ErrorCircles from "./ErrorCircle";


const CSVDataTable = ({ data }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [allPacks, setAllPacks] = useState([]);
    const [validatedData, setValidatedData] = useState([]);
    const [isDataValid, setIsDataValid] = useState([true])

    async function fetchData() {
        const productsResponse = await api.get('products');
        setAllProducts(productsResponse.data);

        const packsResponse = await api.get('packs');
        setAllPacks(packsResponse.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (allProducts.length > 0 && allPacks.length > 0) {
            const dadosValidados = data.map((objeto) => {
                const bd = allProducts.find((obj) => obj.code == objeto.product_code)

                if (typeof (bd) === "object") {
                    if (objeto.product_code === "" || objeto.new_price === null) {
                        setIsDataValid(false)
                    }
                    if (objeto.new_price < objeto.cost_price
                        || objeto.new_price > (objeto.sales_price + objeto.sales_price * 0.1)
                        || objeto.new_price < (objeto.sales_price - objeto.sales_price * 0.1)) {
                        setIsDataValid(false)
                    }
                    if(!/^\d*\.\d{2}$/.test(objeto.new_price)){
                        if(!isNaN(parseInt(objeto.new_price))){
                            objeto.new_price = objeto.new_price + ".00"
                        }
                    }
                    return {
                        ...objeto,
                        actual_price: bd.sales_price,
                        cost_price: bd.cost_price,
                        name: bd.name,
                    }
                }
                setIsDataValid(false)
                return {
                    ...objeto,
                    actual_price: "",
                    name: "Produto não cadastrado",
                };
            });
            setValidatedData(dadosValidados);
        }
    }, [data, allProducts, allPacks]);

    function getRowStyle(value) {
        if (value.product_code === "" || value.new_price === "") {
            return { borderBottom: '3px solid #8B0000' }
        }
        if (value.name === "Produto não cadastrado") {
            return { borderBottom: '3px solid #FFA500' }
        }
        if (!/^\d*\.\d{2}$/.test(value.new_price)) {
            return { borderBottom: '3px solid #0000AA' }
        }
        if (parseFloat(value.new_price) < parseFloat(value.cost_price)
            || value.new_price > (value.sales_price + value.sales_price * 0.1)
            || value.new_price < (value.sales_price - value.sales_price * 0.1)) {
            return { borderBottom: '3px solid #FF1493' }
        }
        return { borderBottom: '3px solid #ddd  ' }
    }

    function getTooltip(value) {
        if (value === null || value === '') {
            return 'Este valor está vazio ou é nulo.';
        }
        return '';
    }

    const handleAtualizar = () => {
        saveDataToApi()
    }

    function formatarDados() {
        let dados = validatedData.map((produto) => {
            return {
                code: produto.product_code,
                name: produto.name,
                cost_price: produto.cost_price,
                sales_price: produto.new_price
            }
        })
        return dados
    }

    const saveDataToApi = async () => {
        const dadosFormatados = formatarDados()

        const productsResponse = await api.put('products', { products: dadosFormatados })
            .then(response => {
                console.log(response.data);

                alert("Sucesso!");

                //atualiza página
                setTimeout(window.location.reload(), 2000);

            })
            .catch(error => {
                console.error(error);
            });
    };


    const headers = validatedData.length > 0 ? Object.keys(validatedData[0]) : [];

    const headersLabel = ["Codigo", "Nome", "Preço Atual", "Novo Preço"]

    return (
        <Grid alignItems="center" justifyContent="center">
            {validatedData.length === 0 ? (
                <p>No data available.</p>
            ) : (
                <table style={tableStyle}>
                    {/* Renderize a tabela com os dados validados */}
                    <thead>
                        <tr>
                            {headersLabel.map((header, index) => (
                                <th
                                    key={index}
                                    style={tableHeaderStyle}
                                >
                                    {header}
                                </th>

                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {validatedData.map((row, index) => (
                            <tr key={index} style={{ ...tableRowStyle, ...getRowStyle(row) }}>
                                <td style={tableCellStyle}>
                                    <span >{row.product_code}</span>
                                </td>
                                <td style={tableCellStyle}>
                                    <span >{row.name}</span>
                                </td>
                                <td style={tableCellStyle}>
                                    <span >{row.actual_price}</span>
                                </td>
                                <td style={tableCellStyle}>
                                    <span >{row.new_price}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <ErrorCircles />
            <Tooltip label="Os dados contém erros." isOpen={!isDataValid}>
                <Box
                    as='button'
                    height='40px'
                    lineHeight='1.2'
                    px='8px'
                    borderRadius='5px'
                    fontSize='14px'
                    fontWeight='semibold'
                    backgroundColor='#38a169'
                    color='white'
                    my="20px"
                    pointerEvents={isDataValid ? "auto" : "none"}

                    _hover={{ bg: '#2f855a' }}
                    _active={{
                        bg: '#dddfe2',
                        transform: 'scale(0.98)',
                        borderColor: '#bec3c9',
                    }}
                    onClick={handleAtualizar}
                >
                    Atualizar
                </Box>
            </Tooltip>
        </Grid>
    );
};


const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "40px 90px 55px -20px rgba(155, 184, 243, 0.2)",
};

const tableHeaderStyle = {
    fontSize: "14px",
    fontWeight: 500,
    color: "#ffffff",
    backgroundColor: "#0dab77",
    borderBottom: "1px solid #ddd",
    padding: "15px",
    textAlign: "center",
};

const tableCellStyle = {
    fontSize: "15px",
    fontWeight: 500,
    borderBottom: "1px solid #ddd",
    lineHeight: "2",
    padding: "15px"
};

const tableRowStyle = {
    backgroundColor: '#f7f7f7',
    margin: "10px",
    padding: "5px",
    textAlign: 'center',
    transition: 'background-color 0.2s', // Transição suave da cor de fundo
    cursor: 'pointer'
};

export default CSVDataTable;