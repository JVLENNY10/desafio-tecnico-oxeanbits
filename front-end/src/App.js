import './App.css';

import { useEffect, useState } from 'react';
import { getFilms } from './services/get';
import Feed from './components/Feed';

function App() {
  

  return (
    <div className="App">
      <header />

      <main>
        {/* <div className='films-list'>
          {
            films.map((film, index) => (
              <div className='card-film' key={ index }>
                { console.log(film) }
                <img alt={ `image_${index}` } src={ process.env.REACT_APP_IMG + film.backdrop_path } />

                <div className='vote-average'>
                  <FaStar className='star' />
                  <span>{ parseFloat(film.vote_average).toFixed(1).replace('.', ',') }</span>
                </div>

                <h1>{ film.title }</h1>
              </div>
            ))
          }
        </div> */}

        <Feed />
      </main>
    </div>
  );
}

export default App;
