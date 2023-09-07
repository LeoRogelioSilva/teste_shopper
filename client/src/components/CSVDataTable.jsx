import React, { useEffect, useState } from "react";
import api from '../services/api';
import { Button } from "@chakra-ui/react";

const CSVDataTable = ({ data }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [allPacks, setAllPacks] = useState([]);
    const [validatedData, setValidatedData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const productsResponse = await api.get('products');
            setAllProducts(productsResponse.data);

            const packsResponse = await api.get('packs');
            setAllPacks(packsResponse.data);
        }

        fetchData();
    }, []);

    function validarDados(objeto) {
        // Realize as validações aqui, utilizando allProducts e allPacks se necessário
        // Exemplo: Verifique se objeto.product_code e objeto.new_price são válidos
        if (objeto.product_code && objeto.new_price) {
            return "true";
        }
        return "false";
    }

    useEffect(() => {
        // Aplica a validação aos dados quando allProducts e allPacks estiverem prontos
        if (allProducts.length > 0 && allPacks.length > 0) {
            const dadosValidados = data.map((objeto) => {
                const isValid = validarDados(objeto);
                const bd = allProducts.find((obj) => obj.code == objeto.product_code)
                console.log(typeof (bd) === "object")
                if (typeof (bd) === "object") {
                    return {
                        ...objeto,
                        actual_price: bd.sales_price,
                        cost_price: bd.cost_price,
                        name: bd.name,
                    }
                }
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
        if (value.product_code == "") {
            return { backgroundColor: '#' }
        }
        return {
            backgroundColor: '',
            cursor: 'warning'
        };

    }

    function getTooltip(value) {
        if (value === null || value === '') {
            return 'Este valor está vazio ou é nulo.';
        }
        return '';
    }

    const headers = validatedData.length > 0 ? Object.keys(validatedData[0]) : [];

    return (
        <>
            {validatedData.length === 0 ? (
                <p>No data available.</p>
            ) : (
                <table style={tableStyle}>
                    {/* Renderize a tabela com os dados validados */}
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index} style={tableHeaderStyle}>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {validatedData.map((row, index) => (
                            <tr key={index} style={{ ...tableRowStyle, ...getRowStyle(row) }}>
                                {headers.map((header, columnIndex) => (
                                    <td key={columnIndex} style={{tableCellStyle}}>
                                        <span title={getTooltip(row[header])}>{row[header]}</span>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Button>Atualizar</Button>
        </>
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
    textAlign: "left",
};

const tableCellStyle = {
    fontSize: "14px",
    fontWeight: 500,
    borderBottom: "1px solid #ddd",
    padding: "15px"
};  

const tableRowStyle = {
    backgroundColor: '#f7f7f7', 
    margin: "10px",
    textAlign: 'center',
    transition: 'background-color 0.2s', // Transição suave da cor de fundo
    cursor: 'pointer'
};

export default CSVDataTable;