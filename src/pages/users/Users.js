import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import MUIDataTable, { ExpandButton } from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import classnames from "classnames";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import api from "../../services/api";
import { textLabels } from "../../utils/labelsTable";
import { columns } from "../../utils/columnsContacts";
import { Button } from "../../components/Wrappers/Wrappers";
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Users(props) {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [openModal, setOpenModal] = useState(false);

  async function getUsers() {
    try {
      const { data } = await api.get('users');

      setUsers(data);
    } catch (error) {
      toast.error('Ocorreu um erro inesperado. Tente novamente!');
    }
  }

  useEffect(() => {
    getUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editUser = userId => {
    return props.history.push({
      pathname: "/app/edit-users",
      state: {
        id: userId,
      },
    });
  };

  const deleteUser = async () => {
    try {
      await api.delete(`users/${selectedUserId}`);

      setOpenModal(false);

      toast.success('Cliente excluido com sucesso!');

      return getUsers();
    } catch (error) {
      return toast.error('Ocorreu um erro inesperado. Tente novamente!');
    }
  };

  const alertDelete = userId => {
    setSelectedUserId(userId);

    return setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const options = {
    selectableRows: 'none',
    filterType: 'checkbox',
    textLabels,
    expandableRows: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: true,
    renderExpandableRow: rowData => {
      const colSpan = rowData.length + 1;
      return (
        <TableRow>
          <TableCell colSpan={colSpan}>
            Ações:
            <Button
              variant="contained"
              color="info"
              className={classnames(classes.buttonOptions)}
              onClick={() => editUser(rowData[0])}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              className={classnames(classes.buttonOptions)}
              onClick={() => alertDelete(rowData[0])}
            >
              Excluir
            </Button>
          </TableCell>
        </TableRow>
      );
    },
  };

  const theme = createMuiTheme({
    overrides: {
      MUIDataTableSelectCell: {
        expandDisabled: {
          visibility: 'hidden',
        },
      },
    },
  });

  const components = {
    ExpandButton: props => {
      return <ExpandButton {...props} />;
    }
  }

  const addUsers = () => {
    return props.history.push("/app/add-users");
  }

  return (
    <>
      <PageTitle title="Clientes" button={
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          onClick={addUsers}
        >
          Adicionar
        </Button>
      } />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MuiThemeProvider theme={theme}>
            <MUIDataTable
              data={users}
              columns={columns}
              options={options}
              components={components}
            />
          </MuiThemeProvider>
        </Grid>
      </Grid>
      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Atenção! Realmente deseja excluir esta cliente?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={deleteUser} color="success">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
