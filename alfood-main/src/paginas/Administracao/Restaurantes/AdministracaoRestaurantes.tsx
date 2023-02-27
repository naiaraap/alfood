import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import {
  TableContainer, Paper, Table, TableHead,
  TableCell, TableBody, TableRow, Button
} from "@mui/material";
import http from "../../../http";
import { Link } from "react-router-dom";

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  const excluir = (restauranteASerExcluido: IRestaurante) =>{
    http.delete(`restaurantes/${restauranteASerExcluido.id}/`)
    .then(() => {
      const listaRestaurantes = restaurantes.filter(restaurante => restaurante.id !== restauranteASerExcluido.id);
      setRestaurantes([...listaRestaurantes]);
    });
  }

  useEffect(() => {
    http.get<IRestaurante[]>('restaurantes/')
    .then(resposta => setRestaurantes(resposta.data));
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Excluir
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
            <TableCell>
              {restaurante.nome}
            </TableCell>
            <TableCell>
              [ <Link to={`/admin/restaurantes/${restaurante.id}/`}>Editar</Link> ]
            </TableCell>
            <TableCell>
              <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>
                Excuir
              </Button>
            </TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>)
}

export default AdministracaoRestaurantes;