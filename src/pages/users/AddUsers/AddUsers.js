import React, { useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget/Widget";
import { Button } from "../../../components/Wrappers/Wrappers";
import TextMaskFone from "../../../utils/textMaskFone";
import TextMaskCpf from "../../../utils/textMaskCpf";

import api from "../../../services/api";

export default function AddUsers(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    phone: Yup.string().required(),
    cpf: Yup.string().required(),
  });

  async function addUser() {
    try {
      const values = {
        name,
        email,
        phone,
        cpf,
      };

      if (!(await schema.isValid(values))) {
        return toast.error('É necessário preencher todos os campos.');
      }

      await api.post('users', values);

      toast.success('Cliente adicionado com sucesso!');

      return props.history.push("/app/users");
    } catch (error) {
      return toast.error(
        'Ocorreu um erro inesperado. Verifique os dados e tente novamente!'
      );
    }
  }

  return (
    <>
      <PageTitle title="Adicionar Cliente" button={
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          onClick={addUser}
        >
          Adicionar
        </Button>
      } />

      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Widget title="Informações" disableWidgetMenu>
            <TextField
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              margin="normal"
              placeholder="Nome"
              label="Nome"
              type="text"
              fullWidth
            />
            <TextField
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              margin="normal"
              placeholder="E-mail"
              label="E-mail"
              type="email"
              fullWidth
            />
            <FormControl
              margin="normal"
              fullWidth
            >
              <InputLabel htmlFor="phone">Telefone</InputLabel>
              <Input
                id="phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                name="textmask"
                inputComponent={TextMaskFone}
                type="phone"
              />
            </FormControl>
            <FormControl
              margin="normal"
              fullWidth
            >
              <InputLabel htmlFor="cpf">CPF</InputLabel>
              <Input
                id="cpf"
                value={cpf}
                onChange={e => setCpf(e.target.value)}
                name="textmask"
                inputComponent={TextMaskCpf}
                type="text"
              />
            </FormControl>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
