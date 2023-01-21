import React, { useState, useEffect } from "react";
import api from "../../utils/axios";
import Pagination from "../../components/pagination/pagination.component";
import Card from "../../components/card/card.component";

import './random-users.styles.css';

// Typing of the elements
//Tipagem dos elementos
export type dataType = {
  id: number;
  phone: string;
  email: string;

  login: {
    username: string;
  };

  dob: {
    age: number;
  };

  picture: {
    large: string;
  };

  name: {
    first: string;
    last: string;
    title: string;
  };
};

const RandomUsers = () => {
  //Hooks to store data received from the Random-Users api
  //Hooks para armazenar dados recebidos da api Random-Users
  const [users, setUsers] = useState<dataType[]>([]);
  const [apiData, setApiData] = useState<Array<{}>>([]);

  const [currentPage, setCurrentPage] = useState(1);        //Hook to set current page in pagination    //Hook para definir pagina atual na paginação
  const [postsPerPage] = useState(4);                     //Hook to define how many cards with data will be displayed per page      //Hook para definir quantos cards com dados serão exibidos por pagina

  const indexOfLastPost = currentPage * postsPerPage;       //Variable that stores the index of the last page   //Variável que armazena indice da última página 
  const indexOfFirstPost = indexOfLastPost - postsPerPage;   // Variable that stores index of the first page  // Variável que armazena indice da primeira página

  // Function responsible for pagination, set the current page as the one selected in the component
  // Função responsável pela paginação, defina a página atual como sendo a que foi selecionada no componente
  const paginate = (pageNumber: React.SetStateAction<number>) =>
    setCurrentPage(pageNumber);

  useEffect(() => {
    async function fetchData() {
      const res = await api.get(
        '/random-users'
      );
      setUsers(res.data.results);
      setApiData(renderData(res.data.results));
    }
    // Function to download data from the backend api
    // Função para baixar dados da api que está no backend
    fetchData();
  }, []);

// Function responsible for rendering the data
  // Função responsável por renderizar os dados
  const renderData = (data: dataType[]) => {
    return data.map((cardData, index) => <Card key={index} data={cardData} />);
  };

// Function that performs filtering on the downloaded data according to the input search to perform a search among the displayed data
  // Função que realiza filtragem nos dados baixados de acordo com o input search para realizar busca entre os dados exibidos
  const searchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiData(
      renderData(
        users.filter(
          (item) =>
            item.name.first.toLowerCase().includes(e.target.value) ||
            item.name.last.toLowerCase().includes(e.target.value)
        )
      )
    );
    setCurrentPage(1)
  };

// Component that displays data from the selected page
  // Componente que exibe os dados da página selecionada
  const CurrentPosts = () => {
    return <>{apiData?.slice(indexOfFirstPost, indexOfLastPost)}</>;
  };

  return (
    <>
      <div className="input-users">
      <input
        type="text"
        placeholder="Search for users name"
        onChange={searchInput || ""}
      />
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <CurrentPosts />
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={apiData?.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
};

export default RandomUsers;
