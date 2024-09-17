import React, { useState } from "react";
import styled from "styled-components";

import { createClient } from "../../../services/clientsService";

import InputComponent from "../../../components/InputComponent/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";

const StyledForm = styled.form`
  gap: 20px;
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ClientForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [companyValuation, setCompanyValuation] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "salary") setSalary(value);
    if (name === "companyValuation") setCompanyValuation(value);

    setIsFormValid(
      name.trim() !== "" &&
        salary.trim() !== "" &&
        companyValuation.trim() !== ""
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const numericSalary = parseFloat(salary);
        const numericCompanyValuation = parseFloat(companyValuation);

        if (isNaN(numericSalary) || isNaN(numericCompanyValuation)) {
          console.error("Valores inválidos para salário ou valor da empresa.");
          return;
        }

        await createClient({
          name,
          salary: numericSalary,
          companyValuation: numericCompanyValuation,
        });

        onSuccess();
      } catch (error) {
        console.error("Erro ao criar cliente:", error);
      }
    } else {
      console.log("Formulário inválido.");
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <InputComponent
        name="name"
        placeholder="Digite o nome"
        required
        value={name}
        onChange={handleInputChange}
      />
      <InputComponent
        name="salary"
        placeholder="Digite o salário"
        type="number"
        required
        value={salary}
        onChange={handleInputChange}
        errorMessage="Este campo só aceita números"
      />
      <InputComponent
        name="companyValuation"
        placeholder="Digite o valor da empresa"
        type="number"
        required
        value={companyValuation}
        onChange={handleInputChange}
        errorMessage="Este campo só aceita números"
      />
      <ButtonComponent
        text="Criar Cliente"
        type="submit"
        disabled={!isFormValid}
      />
    </StyledForm>
  );
};

export default ClientForm;
