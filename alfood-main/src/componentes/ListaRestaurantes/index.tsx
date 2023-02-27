import http_v1 from '../../http_v1/http_v1';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [numeroPaginas, setNumeroPaginas] = useState(0);
  //const [page, setMyPage] = useState([]);
  const [pagesItens, setPageItens] = useState(0);

  useEffect(() => {
    http_v1.get<IPaginacao<IRestaurante>>('restaurantes/')
      .then(resposta => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next.replace('http://localhost:8000/api/v1/', ''));
        setNumeroPaginas(Math.floor(resposta.data.count/6) + 1);
        setPageItens(resposta.data.count);
      })
      .catch(erro => {
        console.log(erro);
      })
  }, []);

  const verMais = () => {
    http_v1.get<IPaginacao<IRestaurante>>(proximaPagina)
      .then(resposta => {
        setRestaurantes([...restaurantes, ...resposta.data.results]);
        setProximaPagina(resposta.data.next);
      })
      .catch(erro => {
        console.log(erro);
      })
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {proximaPagina && <button onClick={verMais}>
      Ver mais
    </button>}
    {<Stack spacing={5}>
      <Pagination count={numeroPaginas} 
      defaultPage={1} 
      boundaryCount={pagesItens}
      
      />
    </Stack>}
  </section>)
}

export default ListaRestaurantes