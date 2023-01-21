import React, { useState, useEffect, useContext } from "react";
import { FiEdit3, FiEye, FiFilePlus, FiTrash2 } from "react-icons/fi";

import api from "./../../utils/axios";
import DynamicTable from "../../components/dynamic-table/dynamic-table";
import Modal from './../../components/modal/modal.components';
import FormCrud from "./form-crud/form-crud";
import { Form } from "./form-crud/form-crud";
import GeralCrud from "./geral";
import { UserContext } from "../../context/user-context";

type DataType = {
  _id: string
  name?: string,
  email?: string,
  cpf?: string,
  address?: string,
  phone?: string,
};

const CRUD = () => {

  // Dados que são recebidos
  const data = {
    name: "",
    email: "",
    cpf: "",
    address: "",
    phone: "",
  }
  const [modalForm, setModalForm] = useState(false);  //Hook to control the form's modal  //Hook para controle do modal do formulário
  const [modalGeral, setModalGeral] = useState(false);  //Hook to control the general info modal  //Hook para controle do modal das info gerais
  const [modalDelete, setModalDelete] = useState(false);  //Hook to control the modal that is removed    //Hook para controle do modal que remoção 

  const [crud, setCrud] = useState<Form>(data);           //Hook for storing the object with the data, to be passed to child components   //Hook para armazenamento do objeto com os dados, para ser passado aos componentes filhos
  const [updating, setUpdating] = useState(false);      // Hook for update control      //Hook para controle do modo update

  const [staticData, setStaticData] = useState<DataType[]>([]);     //Data downloaded from the backend (READ) that were previously registered    //Dados baixados do backend (READ) que já foram previamente cadastrado 
  const [load, setLoad] = useState(false);   // Hook for rendering to wait for data to be downloaded   // Hook para renderezação aguardar dados serem baixados

  const auth = useContext(UserContext)

    // Function for deleting (DELETE) selected data
  // Função para exclusão (DELETE) de dados selecionado
  const handleDelete = async () => {
    if (!crud) return alert("Nenhum dado selecionado!");
    const id = crud._id
    await api.post('/deleteClient', { id }, { headers: { authorization: auth.currentUser?.token } })
    window.location.reload()
    return
  }

// Data is downloaded from the backend before rendering
  // Dados são baixados do backend antes da renderização
  useEffect(() => {
    const fetchData = async () => {
      const users = await api.get("/getClients", { headers: { authorization: auth.currentUser?.token } });
      setStaticData(users.data);
      setLoad(true);
    };
    fetchData();
  }, [modalForm]);

  if (!load) return <h3>Carregando...</h3>;
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent:'center', alignItems: 'center'}}>

      <Modal parentState={modalDelete}>
        <>
          <p> Tem certeza que deseja excluir os dados de {`${crud.name}`} permanentemente do banco de dados? </p>
          <span>
            <button className="primary-button" onClick={handleDelete}  > Confirmar </button>
            <button className="primary-button" onClick={() => setModalDelete(false)} > Cancelar </button>
          </span>
        </>
      </Modal>

      <GeralCrud
        parentState={modalGeral}
        setParentState={setModalGeral}
        setCrud={setCrud}
        crud={crud}
      />

      <FormCrud
        parentState={modalForm}
        setParentState={setModalForm}
        crud={crud}
        setCrud={setCrud}
        updating={updating}
      />

      <h2>CRUD</h2>
      <DynamicTable
        hoveble={true}
        dataStatic={staticData}
        dataStruct={[
          {
            header: "Nome",
            field: "name",
          },
          {
            header: "Email",
            field: "email",
          },
          {
            header: "Cpf",
            field: "cpf",
          },
          {
            header: "Address",
            field: "address",
          },
          {
            header: "Phone",
            field: "phone",
          }
        ]}
        navItens={[
          {
            returnIcon: FiEye,
            describe: "General Information",
            action: (itens: string[], dataCache: DataType[]) => {
              setCrud(dataCache.filter(item => item._id === itens[0])[0])
              setModalGeral(true);
            },
            activeWith: (itens: string[], cache: DataType[]) =>
              itens.length === 1 && cache.find((item) => item._id === itens[0]),
          },
          {
            returnIcon: FiFilePlus,
            describe: "Create",
            action: (itens: string[], dataCache: DataType[]) => {
              setUpdating(false);
              setModalForm(true);
            },
            activeWith: () => true,
          },
          {
            returnIcon: FiEdit3,
            describe: "Update",
            action: (itens: string[], dataCache: Array<DataType>) => {
              setUpdating(true);
              setCrud(dataCache.filter(item => item._id === itens[0])[0])
              setModalForm(true);
            },
            activeWith: (itens: string[], cache: Array<DataType>) =>
              itens.length === 1 && cache.find((item) => item._id === itens[0]),
          },
          {
            returnIcon: FiTrash2,
            describe: "Delete",
            action: (itens: string[], dataCache: DataType[]) => {
              setCrud(dataCache.filter(item => item._id === itens[0])[0])
              setModalDelete(true)
            },
            activeWith: (itens: string[], cache: DataType[]) =>
              itens.length === 1 && cache.find((item) => item._id === itens[0]),
            red: true,
          },
        ]}
      />
    </div>
  );
};

export default CRUD;
