import Feed from './components/Feed';
import { getFilms } from './services/get';
import { useEffect, useState } from 'react';

function App() {
  return (
    <div className="App">
      <header />

      <main>
        <Feed />
      </main>
    </div>
  );
}

export default App;
