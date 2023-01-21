import React, { useState } from 'react';
import DynamicTablez from '../../components/dynamic-table/dynamic-table';
import { FiEdit3, FiEye, FiFilePlus, FiTrash2 } from "react-icons/fi";

interface Dataz {
  _id: string;
  [key: string]: string;
}

interface Field {
  name: string;
  value: string;
}

interface Button {
  name: string;
  onClick: (item: Dataz) => void;
}

interface Props {
  dataz: Dataz[];
  fields: Field[];
  buttons: Button[];
}

const DynamicTable: React.FC<Props> = ({ dataz, fields, buttons }) => {
  const [selectedData, setSelectedData] = useState<Dataz | null>(null);

  return (<>
    <div>
      <table>
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={field.name}>{field.name}</th>
            ))}
            {buttons.map((button) => (
              <th key={button.name}>{button.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataz.map((item) => (
            <tr key={item.id} onClick={() => setSelectedData(item)}>
              {fields.map((field) => (
                <td key={field.name}>{item[field.value]}</td>
              ))}
              {buttons.map((button) => (
                <td key={button.name}>
                  <button onClick={() => button.onClick(item)}>
                    {button.name}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedData && (
        <div>
          {Object.entries(selectedData).map(([key, value]) => (
            <div key={key}>
              <strong>{key}:</strong> {value}
            </div>
          ))}
        </div>
      )}
    </div>
    <DynamicTablez
    hoveble={true}
      dataStatic={dataz}
      dataStruct={[
        {
          header: "Nome",
          // orderHeader: true,
          field: "name",
          // decorate: false,
          // styleDecorate: false,
        },
        {
          header: "Idade",
          // orderHeader: true,
          field: "age",
          // decorate: false,
          // styleDecorate: false,
        },
      ]}
      navItens={[
        {
          returnIcon: FiEye,
          describe: "Geral Colaborador",
          // withPerm: true,
          action: () => {
            // navigate(`/administrador/usuarios/editar/${itens[0]}`);
            // setUpdating(false);
            // setModalForm(true);
          },
          activeWith: (itens, cache) => itens.length === 1 && cache.find((item) => item._id === itens[0])
        },
        {
          returnIcon: FiFilePlus,
          describe: "Novo Colaborador",
          // withPerm: permissoes.adicionar,
          action: () => {
            // setUpdating(false);
            // setModalForm(true);
          },
          activeWith: () => true,
        },
        {
          returnIcon: FiEdit3,
          describe: "Editar Colaborador",
          // withPerm: permissoes.editar,
          action: (itens, dataCache) => {
            // setUpdating(true);
            // setUsuario(dataCache.find((item) => item.id === itens[0]));
            // setModalForm(true);
          },
          activeWith: (itens, cache) =>
            itens.length === 1 && cache.find((item) => item._id === itens[0]),
        },
        {
          returnIcon: FiTrash2,
          describe: "Excluir",
          // withPerm: permissoes.excluir,
          action: (itens, dataCache) => {
            // setUsuario(dataCache.find((item) => item.id === itens[0]));
            // setConfirmMessage(
            //   <h4>Tem certeza que deseja continuar com a exclusão?</h4>
            // );
            // setModalOption("delete");
          },
          activeWith: (itens, cache) =>
            itens.length === 1 && cache.find((item) => item._id === itens[0]),
          red: true,
        },
      ]}
    />
  </>);
};

export default DynamicTable;
