import React, { useState } from "react";
import { Form } from "./form-crud/form-crud";
import Modal from './../../components/modal/modal.components';

type GeralProps = {
    parentState: boolean;       // boolean that informs if modal is active or not   // boolean que infoma se modal está ativo ou não
    setParentState: (state: boolean) => void;       // Function that changes the status of the modal      // Função que altera situação do modal
    setCrud: (crud: Form) => void;          // Function that clears hook data when modal is closed         // Função que limpa os dados do hook quando modal é fechado
    crud: Form;             //Data that is displayed in the component        //Dados que são exibidos no componente
}

type Modal = {
    [key: string]: JSX.Element
}

export default function GeralCrud({ parentState, crud, setParentState, setCrud }: GeralProps) {
    const [modalOption, setModalOption] = useState("geral");        //Hook to control the general info modal  //Hook para controle do modal das info gerais

    const modalOptionsMap: Modal = {
        geral: (
            <>
                <table className="secundary-table" cellSpacing="0" cellPadding="8" style={{height:'400px',  width: '80%' }}>
                    <tbody>
                        <tr>
                            <td style={{borderStyle: 'groove'}}>Nome</td>
                            <td> {crud?.name} </td>
                        </tr>
                        <tr>
                            <td style={{borderStyle: 'groove'}}> Email </td>
                            <td> {crud?.email} </td>
                        </tr>
                        <tr>
                            <td style={{borderStyle: 'groove'}}> CPF </td>
                            <td> {crud?.cpf} </td>
                        </tr>
                        <tr>
                            <td style={{borderStyle: 'groove'}}> Endereço </td>
                            <td> {crud?.address} </td>
                        </tr>
                        <tr>
                            <td style={{borderStyle: 'groove'}}> Telefone </td>
                            <td> {crud?.phone || "-"} </td>
                        </tr>
                    </tbody>
                </table>

                <button
                    className="primary-button"
                    style={{
                        color: "#006699",
                        backgroundColor: "white",
                        border: "1px solid",
                    }}
                    onClick={() => { setParentState(false); setCrud({}); setModalOption('geral') }}
                >
                    Sair
                </button>
            </>
        )
    }

    return (<>
        <Modal parentState={parentState}>{modalOptionsMap[modalOption]}</Modal>
    </>)
}