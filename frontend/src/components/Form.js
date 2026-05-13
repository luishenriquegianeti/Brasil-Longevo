import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 520px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
  width: 1090px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.Nome.value = onEdit.Nome;
      user.Categoria.value = onEdit.Categoria;
      user.Descricao.value = onEdit.Descricao;
      user.Estoque.value = onEdit.Estoque;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.Nome.value ||
      !user.Categoria.value ||
      !user.Descricao.value ||
      !user.Estoque.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put(
          "http://localhost:8800/" + onEdit.idMedicamentos,
          {
            Nome: user.Nome.value,
            Categoria: user.Categoria.value,
            Descricao: user.Descricao.value,
            Estoque: user.Estoque.value,
          }
        )
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));

    } else {
      await axios
        .post("http://localhost:8800", {
          Nome: user.Nome.value,
          Categoria: user.Categoria.value,
          Descricao: user.Descricao.value,
          Estoque: user.Estoque.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.Nome.value = "";
    user.Categoria.value = "";
    user.Descricao.value = "";
    user.Estoque.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="Nome" />
      </InputArea>

      <InputArea>
        <Label>Categoria</Label>
        <Input name="Categoria" />
      </InputArea>

      <InputArea>
        <Label>Descrição</Label>
        <Input name="Descricao" />
      </InputArea>

      <InputArea>
        <Label>Estoque</Label>
        <Input name="Estoque" type="number" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;