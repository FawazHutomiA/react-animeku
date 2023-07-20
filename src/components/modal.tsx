/** @jsxImportSource @emotion/react */
"use client";
import { css, SerializedStyles } from "@emotion/react";

interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode;
}

export default function Modal({ children, closeModal }: ModalProps) {
  const handleClose = () => {
    closeModal();
  };

  return (
    <div css={styles}>
      <div className="closeModal" onClick={handleClose}>
        X
      </div>
      {children}
    </div>
  );
}

const styles: SerializedStyles = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #e1e1e1;
  border-radius: 0.5rem;
  padding: 2rem;
  width: fit-content;
  height: fit-content;

  .closeModal {
    position: absolute;
    top: -1.4rem;
    right: -1.2rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    cursor: pointer;
    background-color: black;
    border-radius: 0.5rem;
    color: white;
  }
`;
