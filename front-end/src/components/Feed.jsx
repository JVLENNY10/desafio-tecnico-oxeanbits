import moment from 'moment';
import { getFilms } from '../services/get';
import React, { useEffect, useRef, useState } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

const Feed = () => {
  const loadMoreRef = useRef(null);
  const [films, setFilms] = useState([]);
  const [isMobile, setIsMobile] = useState(window.outerWidth < 1250);

  const customCellClassification = (props) => (
    <td style={ { border: '2px solid white', textAlign: 'center', ...props.style } }>
      { props.dataItem.adult ? 'Maiores de 18' : 'Menores de 18' }
    </td>
  );

  const customCellDate = (props) => (
    <td style={ { border: '2px solid white', textAlign: 'center', ...props.style } }>
      { moment(props.dataItem.release_date).format('DD/MM/YYYY') }
    </td>
  );

  const customCellImage = (
    (props) => (
      <td style={ { border: '2px solid white', ...props.style } }>
        <img src={ process.env.REACT_APP_IMG + props.dataItem[props.field] } alt={ props.dataItem.title } width={ '100%' } />
      </td>
    )
  );

  const customCellTitle = (props) => (
    <td style={ { border: '2px solid white', width: !isMobile ? '150px' : '50%', fontSize: !isMobile ? '15px' : '20px', ...props.style } }>
      { props.dataItem[props.field] }
    </td >
  );

  const loadFilms = async () => {
    const response = await getFilms();
    setFilms(response.results);
  };

  useEffect(() => {
    loadFilms();

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setFilms(prevFilms => [...prevFilms, ...prevFilms.slice(0, 20)]);
    }, { threshold: 1.0 });

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.outerWidth < 1250);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Grid
        className='films-list'
        data={ films }
        style={ { background: 'black', borde: '2px solid white', color: 'white', display: 'flex', justifyContent: 'center', paddingTop: '30px', textAlign: 'center' } }
      >
        <Column cell={ customCellImage } field={ !isMobile ? 'poster_path' : 'backdrop_path' } title='Imagem' width='300vw' />
        <Column cell={ customCellTitle } field='title' title='Título' width='300vw' />

        { !isMobile && <Column cell={ customCellClassification } field='adult' title='Classificação' width='200vw' /> }
        { !isMobile && <Column cell={ customCellDate } field='release_date' title='Data de Lançamento' width='200vw' /> }
        { !isMobile && <Column cell={ customCellTitle } field='vote_average' title='Pontuação' width='200vw' /> }
      </Grid>

      <div ref={ loadMoreRef } />
    </>
  );
};

export default Feed;
