import React, { useState, useEffect } from "react";
import Api from "./services/api";
import "./styles.css";
import api from "./services/api";

function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get("/repositories").then((response) => {
            setRepositories(response.data);
        });
    }, []);

    async function handleAddRepository() {
        const response = await api.post("/repositories", {
            title: "Novo Repositorio",
            url: "url do novo Repositorio",
            techs: ["techs", "Novo Repositorio"],
        });

        return setRepositories([...repositories, response.data]);
    }

    async function handleRemoveRepository(id) {
        await api.delete(`/repositories/${id}`);

        const repositoriesFiltered = repositories.filter((repository) => repository.id !== id);

        setRepositories(repositoriesFiltered);
    }

    return (
        <div>
            <ul data-testid="repository-list">
                {repositories.map((repository) => (
                    <li key={repository.id}>
                        {repository.title}
                        <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
                    </li>
                ))}
            </ul>

            <button onClick={handleAddRepository}>Adicionar</button>
        </div>
    );
}

export default App;
