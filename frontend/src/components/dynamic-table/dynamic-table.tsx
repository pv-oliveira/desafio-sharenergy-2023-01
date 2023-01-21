import { useState, useEffect } from "react";

import "./dynamic-table.styles.css";

// Element typing
// Tipagem dos elementos
type DataType = {
  _id: string
}

type NavItens = {
  describe: string;
  red?: boolean;
  action: (selectedItems: string[], dataCache: DataType[]) => void;
  activeWith: (selectedItems: string[], dataCache: DataType[]) => false | DataType | undefined | boolean;
  desSelect?: boolean;
  returnIcon: Function;
}

type DataStruct = {
  header: string;
  field: string;
}

type Props = {
  dataStatic: DataType[];
  dataStruct: DataStruct[];
  hoveble: boolean;
  navItens: NavItens[]
}

// Component that generates a table with data dynamically.
/*
  props:
{
  dataStatic?:      static data, or loaded into another component
  dataStruct: [{    expected structure of downloaded data
    header,         indicates a column heading for a piece of data
    field,          indicates data field name
  }]
  hoveble:          boolean indicating that table items are selectable, default true
  navItens?: [{     (optional) list with control of the navbar
    returnIcon:     function to return JSX with icon (react icons)
    describe:       text for icon tooltip
    action:         function activated by clicking on the icon, has the selected items as a parameter
    activeWith:     function to indicate whether an item is clickable or not, has the selected items as a parameter and must return boolean
  }]
*/

// Componente que gera uma tabela com dados dinâmicamente
/*
props:
{
  dataStatic?:      dados estáticos, ou carregados em outro componente
  dataStruct: [{    estrutura esperada do dado baixado
    header,         indica um titulo da coluna para um dado
    field,          indica nome do campo do dado
  }]
  hoveble:          booleano que indica que itens da tabela são selecionávels, default true
  navItens?: [{     (opcional) lista com itens de navbar de controle
    returnIcon:     função para retorno de JSX com icone (react icons)
    describe:       texto para tooltipe do icone
    action:         função acionada com o click no ícone, tem como parâmetro os itens selecionados
    activeWith:     função para indicar se item é clical ou não, tem como parâmetro os itens selecioados e deve retornar bool
  }]
}
*/

export default function DynamicTable({ dataStatic, dataStruct, hoveble, navItens }: Props) {
  const [rendData, setRendData] = useState<DataType[]>([]);        // Stores list of data to be rendered on screen       // Guarda lista de dados a serem renderizadas na tela

  const [selectItem, setSelectItem] = useState<string[]>([]);      //Stores list with selected item ids in the table     // Guarda lista com ids de item selecionados na tabela

  const [load, setLoad] = useState(false);                        // Indicates that loading is complete          // Indica que carregamento foi concluído
  const [renderTrigger, setRenderTrigger] = useState(false);   //  force components to update            // Força a atualização de componentes

  //Function to format rendered data according to given structure and will return a list with columns
  // Função para formatar dado renderizado de acordo com estrutura dada e retornará uma lista com colunas
  function acertItem(item: DataType) {
    const coluns: Array<{ formated: string }> = [];
    const dataToForEach = dataStruct
    dataToForEach.forEach((element) => {
      if (element) {
        const field = element?.field;
        const formatedItem = item[field as keyof DataType];
        coluns.push({ formated: formatedItem });
      }
    });

    return coluns;
  }

  //Function to select (or "deselect") item 
  // Função para selecionar (ou "deselecionar") um item
  function handleClickItem(itemId: string) {
    if (hoveble) {
      if (selectItem[0] !== itemId) setSelectItem([itemId]);
      else setSelectItem([]);

      // Forcing a render update
      // Forçando atualização da renderização  
      setRenderTrigger(!renderTrigger);
    }
  }

  // Function called on component load
  // Função chamada no carregamento do componente
  useEffect(() => {
    async function fetchData() {
      try {
        async function savingData(data: DataType[]) {
          if (dataStatic) setRendData(data);
          setLoad(true);
        }
        if (dataStatic) {
          savingData(dataStatic)
        }
      } catch (error) {
        console.log(error);
      }
    }

    //Downloading data
    // Baixando dados
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {
        <form className="search-menu" onSubmit={async (e) => { e.preventDefault(); }} >
          <nav>
            {
              navItens?.map((item, index: number) => {
                return (
                  <span
                    key={`nav-item-${index}`}
                    className="hastooltip"
                    onClick={() => {
                      if (item.activeWith(selectItem, rendData)) {
                        item.action(selectItem, rendData);
                        if (item.red || item.desSelect) setSelectItem([]);
                      }
                    }}
                    style={item.activeWith(selectItem, rendData) ?
                      item.red ? { color: "red" } : { color: "#3bb6f3" } : { color: "#ffffff" }}>

                    <span className="svg-container">{item.returnIcon()}</span>
                    <span className="tooltiptext"> {item.describe} </span>
                  </span>
                )
              })
            }
          </nav>
        </form>
      }

      <div id="dynamic-table" className="scroller-content" >
        <table className={hoveble ? "primary-table primary-table-hover" : "primary-table"} cellSpacing="0" cellPadding="8">
          <thead>
            {
              <tr>
                <th>#</th>
                {
                  dataStruct?.map((item, index: number) => {
                    if (item) {
                      return (
                        <th
                          key={`colunms-${index}`}
                        >
                          {item.header}
                        </th>
                      )
                    } else return null
                  })
                }
              </tr>
            }
          </thead>
          <tbody>
            {
              load ? rendData.length === 0 ? <tr>
                <td colSpan={1 + dataStruct?.length} > <i style={{ color: "gray" }} > nenhum item no momento... </i> </td>
              </tr> : rendData.map((item, index) => {
                const coluns = acertItem(item);
                return (
                  <tr
                    key={`rows-${index}-${item?._id}`}
                    onClick={() => handleClickItem(item?._id)}
                    style={selectItem.indexOf(item?._id) !== -1 ? { color: 'white', backgroundColor: '#006699' } : undefined}
                  >
                    <td>{ index + 1 }</td>
                    {coluns?.map((itemInfo, indexItemInfo) => {
                      return <td
                        key={`item-${item?._id}-column-${indexItemInfo}-row-${index}`}
                      >
                        {itemInfo.formated}
                      </td>
                    })}
                  </tr>
                )
              }) : null
            }
          </tbody>
        </table>
      </div>
    </>
  )
}