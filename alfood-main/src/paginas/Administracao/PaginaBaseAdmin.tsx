import { Button, Typography, Box, AppBar, Container, Toolbar, Link, Paper } from "@mui/material";
import http from "../../http";
import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import IRestaurante from "../../interfaces/IRestaurante";
import { Link as RouterLink } from "react-router-dom";


const PaginaBaseAdmin = () => {

  const [nomeRestaurante, setNomeRestaurante] = useState('');

  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then(resposta => setNomeRestaurante(resposta.data.nome));
    }
  }, [parametros]);


  return (
    <>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar>
            <Typography variant='h6'>
              Administração
            </Typography>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Link component={RouterLink} to='/admin/restaurantes'>
                <Button sx={{ my: 2, color: 'white' }}>
                  Restaurantes
                </Button>
              </Link>
              <Link component={RouterLink} to='/admin/restaurantes/novo'>
                <Button sx={{ my: 2, color: 'white' }}>
                  Novo Restaurante
                </Button>
              </Link>
              <Link component={RouterLink} to='/admin/pratos/novo'>
                <Button sx={{ my: 2, color: 'white' }}>
                  Novo Prato
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Container maxWidth='lg' sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>


    </>
  );
};

export default PaginaBaseAdmin;