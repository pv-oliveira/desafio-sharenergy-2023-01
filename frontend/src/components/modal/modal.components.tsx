import { useState, useEffect } from "react";
import "./modal.styles.css";

type ModalProps = {
  children: JSX.Element;
  parentState: boolean;
}

export default function Modal({ children, parentState }: ModalProps) {
  // Controls the visibility of the modal that will be inherited by the parent component
  // Controla a visibilidade do modal que será herdada pelo componente pai
  const [visibility, setVisibility] = useState(false);

  // Function called on component loading
  // Função chamada no carregamento do componente
  useEffect(() => {
    setVisibility(parentState);

  }, [parentState]);

  if (visibility) return (
    <div className="modal-screen">
      <div className="modal-container" >
        {children}
      </div>
    </div>);
  else return null;
}