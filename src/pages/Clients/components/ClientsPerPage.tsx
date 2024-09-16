import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-family: "Inter", sans-serif;
  color: ${({ theme }) => theme.colors.black};
`;

const Select = styled.select`
  font-size: 1rem;
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

interface ClientesPerPageProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ClientesPerPage: React.FC<ClientesPerPageProps> = ({
  value,
  onChange,
}) => {
  return (
    <Container>
      <Label htmlFor="clientesPerPage">Clientes por página:</Label>
      <Select id="clientesPerPage" value={value} onChange={onChange}>
        {[...Array(100).keys()].map((num) => (
          <option key={num + 1} value={num + 1}>
            {num + 1}
          </option>
        ))}
      </Select>
    </Container>
  );
};

export default ClientesPerPage;
