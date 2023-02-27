import { useEffect, useState } from "react";
import IPrato from "../../../interfaces/IPrato";
import {
  TableContainer, Paper, Table, TableHead,
  TableCell, TableBody, TableRow, Button
} from "@mui/material";
import http from "../../../http";
import { Link } from "react-router-dom";

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  const excluir = (pratoASerExcluido: IPrato) =>{
    http.delete(`pratos/${pratoASerExcluido.id}/`)
    .then(() => {
      const listaPratos = pratos.filter(prato => prato.id !== pratoASerExcluido.id);
      setPratos([...listaPratos]);
    });
  }

  useEffect(() => {
    http.get<IPrato[]>('pratos/')
    .then(resposta => setPratos(resposta.data));
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
              Tag
            </TableCell>
            <TableCell>
              Imagem
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
          {pratos.map(prato => <TableRow key={prato.id}>
            <TableCell>
              {prato.nome}
              <TableCell>
              {prato.tag}
            </TableCell>
            <TableCell>
              [< a href={prato.imagem} target=' blank' >ver imagem</a>]
            </TableCell>
            </TableCell>
            <TableCell>
              [ <Link to={`/admin/pratos/${prato.id}/`}>Editar</Link> ]
            </TableCell>
            <TableCell>
              <Button variant="outlined" color="error" onClick={() => excluir(prato)}>
                Excuir
              </Button>
            </TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>)
}

export default AdministracaoPratos;