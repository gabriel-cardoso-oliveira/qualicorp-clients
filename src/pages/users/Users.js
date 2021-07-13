import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import MUIDataTable, { ExpandButton } from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import classnames from "classnames";

import api from "../../services/api";
import { textLabels } from "../../utils/labelsTable";
import { columns } from "../../utils/columnsContacts";
import { Button } from "../../components/Wrappers/Wrappers";
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

export default function Users(props) {
  const classes = useStyles();

  const [users, setUsers] = useState([]);

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
    </>
  );
}
