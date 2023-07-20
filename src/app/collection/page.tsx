/** @jsxImportSource @emotion/react */
"use client";
import Card from "@/components/card";
import Modal from "@/components/modal";
import { css, SerializedStyles } from "@emotion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Collection() {
  // data from localstorage collections array of object with id, name, anime
  const collections = JSON.parse(localStorage.getItem("collections") || "[]");

  console.log(typeof collections, collections);

  const [isShow, setIsShow] = useState(false);

  const [name, setName] = useState("");

  const [error, setError] = useState(false);

  const [isRemove, setIsRemove] = useState(false);

  const [selected, setSelected] = useState<Number[]>([]);

  const router = useRouter();

  const getDataFromChild = (item: any) => {
    console.log(item);
    // console.log(router);
    router.push(`/collection/${item.id}`);
  };

  const handleCreate = () => {
    setIsShow(!isShow);
  };

  const handleClose = () => {
    setIsShow(false);
    setName("");
  };

  const handleSave = () => {
    const id = Math.floor(Math.random() * 1000);

    const data = {
      id: id,
      name: name,
      anime: [],
    };

    const collections = JSON.parse(localStorage.getItem("collections") || "[]");

    const isSame = collections.find((item: any) => item.name === name);

    if (isSame) {
      setError(true);
      return;
    } else {
      collections.push(data);
      localStorage.setItem("collections", JSON.stringify(collections));
      setError(false);
    }

    handleClose();
  };

  const handleRemove = () => {
    setIsRemove(!isRemove);
  };

  const handleSelected = (item: any) => {
    const index = selected.indexOf(item.id);

    if (index > -1) {
      selected.splice(index, 1);
    } else {
      selected.push(item.id);
    }

    setSelected([...selected]);

    if (selected.length > 0 && isRemove == true && collections.length > 0) {
      const collections = JSON.parse(
        localStorage.getItem("collections") || "[]"
      );

      const newCollections = collections.filter(
        (item: any) => !selected.includes(item.id)
      );

      localStorage.setItem("collections", JSON.stringify(newCollections));

      setSelected([]);
    } else {
      return;
    }
  };

  return (
    <>
      <div css={headerContent}>
        <h1 className="title">List of Collections</h1>
        <div className="buttonHeader">
          <button
            onClick={handleCreate}
            disabled={isShow}
            css={isShow == true ? disabledButton : null}
            className="buttonCreate"
          >
            Create a Collection
          </button>
          {collections.length > 0 && (
            <button className="buttonRemove" onClick={handleRemove}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3H7l-1 5h12M5.5 5.5L6 21h12l.5-15.5M10 9v7M14 9v7" />
              </svg>
            </button>
          )}
        </div>
      </div>
      {isRemove && <span css={removeStyle}>Click a collection to remove!</span>}
      {collections.length > 0 ? (
        <div css={styles}>
          {collections.map((item: any, index: Number) => (
            <Card
              key={item.id}
              imageSrc={
                item.anime[0] ? item.anime[0].imageSrc : "/example.jpeg"
              }
              title={item.name}
              getData={() => (isRemove ? null : getDataFromChild(item))}
              getSelect={() => (isRemove ? handleSelected(item) : null)}
              id={item.id}
            />
          ))}
        </div>
      ) : (
        <span css={emptyStyle}>Collection is empty</span>
      )}
      {isShow && (
        <Modal closeModal={handleClose}>
          <div css={isShow ? modal : null}>
            <h1 className="titleModal">Create a new collection</h1>
            <input
              type="text"
              placeholder="Collection Name"
              value={name}
              onChange={(e) => setName(e.target.value.replace(/[^\w\s]/gi, ""))}
            />
            {error && <span>Collection name is already exist</span>}
            <button className="buttonSave" onClick={handleSave}>
              Save
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

const styles: SerializedStyles = css`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  align-items: center;
  justify-items: center;
  padding-right: 4rem;
  padding-left: 4rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const headerContent: SerializedStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 4rem;
  padding-left: 4rem;
  padding-top: 2rem;

  . title {
    font-size: 2rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-left: 4rem;
  }

  .buttonHeader {
    display: flex;
    column-gap: 1rem;
  }

  .buttonCreate {
    padding: 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #f1f1f1;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    font-size: 1rem;

    &:hover {
      background-color: #e1e1e1;
    }
  }

  .buttonRemove {
    display: flex;
    column-gap: 0.5rem;
    padding: 1rem;
    align-items: center;
    border-radius: 0.5rem;
    border: none;
    background-color: #f1f1f1;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &:hover {
      background-color: #e1e1e1;
    }
  }
`;

const modal: SerializedStyles = css`
  display: flex;
  flex-direction: column;

  .titleModal {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  input {
    padding: 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #f1f1f1;
    font-size: 1rem;
    width: 30rem;
  }

  .buttonSave {
    padding: 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #f1f1f1;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 1rem;
  }

  span {
    font-size: 0.8rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    color: red;
  }
`;

const disabledButton: SerializedStyles = css`
  pointer-events: none;
  opacity: 0.5;
`;

const emptyStyle: SerializedStyles = css`
  display: flex;
  justify-content: center;
  margin-top: 10rem;
  font-size: 1.5rem;
  font-weight: 600;
  height: 100vh;
`;

const removeStyle: SerializedStyles = css`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: red;
`;
