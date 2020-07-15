import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepos(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Novo repo',
      url: 'https://github.com/JrLouis1101/desafio-react-nivel01',
      techs:['node.js', 'ReactJS']
  });
    const repo = response.data;
    setRepos([...repositories, repo]);
  }

   function handleRemoveRepository(id) {
     api.delete(`repositories/${id}`);
    
    setRepos(repositories.filter(
      repo => repo.id !== id
      ));
  }


  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repo => (
          <li key={repo.id}>{repo.title}

            <button  onClick={() => handleRemoveRepository(repo.id)}> Remover </button>
          </li>
        ))}



      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
