import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { createClient, updateClient, } from "../../../../services/clientsService";
import InputComponent from "../../../../components/InputComponent/InputComponent";
import ButtonComponent from "../../../../components/ButtonComponent/ButtonComponent";
const StyledForm = styled.form `
  gap: 20px;
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ClientForm = ({ onSuccess, initialValues }) => {
    const [name, setName] = useState("");
    const [salary, setSalary] = useState("");
    const [companyValuation, setCompanyValuation] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        if (initialValues) {
            setName(initialValues.name);
            setSalary(initialValues.salary.toString());
            setCompanyValuation(initialValues.companyValuation.toString());
        }
    }, [initialValues]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "name")
            setName(value);
        if (name === "salary")
            setSalary(value);
        if (name === "companyValuation")
            setCompanyValuation(value);
        setIsFormValid(name.trim() !== "" &&
            salary.trim() !== "" &&
            companyValuation.trim() !== "");
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid) {
            try {
                const numericSalary = parseFloat(salary);
                const numericCompanyValuation = parseFloat(companyValuation);
                if (isNaN(numericSalary) || isNaN(numericCompanyValuation)) {
                    console.error("Valores inválidos para salário ou valor da empresa.");
                    return;
                }
                if (initialValues?.id) {
                    const updateData = {
                        name,
                        salary: numericSalary,
                        companyValuation: numericCompanyValuation,
                    };
                    await updateClient(initialValues.id, updateData);
                    onSuccess();
                }
                else {
                    const createData = {
                        name,
                        salary: numericSalary,
                        companyValuation: numericCompanyValuation,
                    };
                    await createClient(createData);
                    onSuccess();
                }
            }
            catch (error) {
                console.error("Erro ao criar ou atualizar cliente:", error);
            }
        }
        else {
            console.log("Formulário inválido.");
        }
    };
    return (_jsxs(StyledForm, { onSubmit: handleSubmit, children: [_jsx(InputComponent, { name: "name", placeholder: "Digite o nome", required: true, value: name, onChange: handleInputChange }), _jsx(InputComponent, { name: "salary", placeholder: "Digite o sal\u00E1rio", type: "number", required: true, value: salary, onChange: handleInputChange, errorMessage: "Este campo s\u00F3 aceita n\u00FAmeros" }), _jsx(InputComponent, { name: "companyValuation", placeholder: "Digite o valor da empresa", type: "number", required: true, value: companyValuation, onChange: handleInputChange, errorMessage: "Este campo s\u00F3 aceita n\u00FAmeros" }), _jsx(ButtonComponent, { text: initialValues ? "Atualizar Cliente" : "Criar Cliente", type: "submit", disabled: !isFormValid })] }));
};
export default ClientForm;
