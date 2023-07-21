/** @jsxImportSource @emotion/react */
"use client";
import Card from "@/components/card";
import Modal from "@/components/modal";
import { css, SerializedStyles } from "@emotion/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@/components/pagination";

export default function Home() {
  const [selected, setSelected] = useState<Number[]>([]);
  const [data, setData] = useState<any[]>([]);
  const selectedData = data.filter((item) => selected.includes(item.id));
  const router = useRouter();
  const [isSelect, setIsSelect] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isCollection, setIsCollection] = useState(false);
  const [collections, setCollections] = useState<any[]>([]); // Initialize collections state
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const getDataFromChild = (item: any) => {
    router.push(`/detail/${item.id}`);
  };

  const handleSelect = () => {
    setIsSelect(!isSelect);
  };

  const handleSelected = (item: any) => {
    if (selected.includes(item.id)) {
      setSelected(selected.filter((id) => id !== item.id));
    } else {
      setSelected([...selected, item.id]);
    }
  };

  const addToCollection = () => {
    setIsShow(!isShow);
  };

  const createCollection = () => {
    setIsCollection(!isCollection);
  };

  useEffect(() => {
    const collectionsData = JSON.parse(
      localStorage.getItem("collections") || "[]"
    );
    setCollections(collectionsData);
  }, []);

  const addCollection = () => {
    const id = Math.floor(Math.random() * 1000);

    const data = {
      id: id,
      name: name,
      anime: [],
    };

    const isSame = collections.find((item: any) => item.name === name);

    if (isSame) {
      setError(true);
      return;
    } else {
      collections.push(data);
      localStorage.setItem("collections", JSON.stringify(collections));
      setIsCollection(!isCollection);
      setName("");
      setError(false);
    }
  };

  const handleClose = () => {
    setIsShow(!isShow);
  };

  const handleSave = () => {
    const collections = JSON.parse(localStorage.getItem("collections") || "[]");

    const collectionId = document.getElementById(
      "collection"
    ) as HTMLSelectElement;

    const selectedCollection = collections.find(
      (item: any) => item.id == collectionId.value
    );

    const data = {
      id: selectedCollection.id,
      name: selectedCollection.name,
      anime: selectedData,
    };

    const isSame = collections.find((item: any) => item.id === data.id);

    if (isSame) {
      const newData = collections.map((item: any) => {
        if (item.id === data.id) {
          return {
            ...item,
            anime: [...item.anime, ...data.anime],
          };
        } else {
          return item;
        }
      });

      localStorage.setItem("collections", JSON.stringify(newData));
    } else {
      collections.push(data);
      localStorage.setItem("collections", JSON.stringify(collections));
    }

    setIsShow(!isShow);

    setSelected([]);

    setIsSelect(false);
  };

  const fetchData = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await axios.post("https://graphql.anilist.co", {
        query: `
        query ($page: Int, $perPage: Int) {
          Page(page: $page, perPage: $perPage) {
            pageInfo {
              total
              currentPage
              lastPage
              hasNextPage
              perPage
            }
            media(type: ANIME) {
              id
              title {
                romaji
                english
                native
              }
              coverImage {
                large
              }
              startDate {
                year
                month
                day
              }
            }
          }
        }
      `,
        variables: {
          page: page,
          perPage: 10,
        },
      });

      const animeData = response.data.data.Page.media.map((item: any) => ({
        id: item.id,
        imageSrc: item.coverImage.large,
        title: item.title.romaji,
        year: item.startDate.year,
      }));

      setData(animeData);
      setCurrentPage(response.data.data.Page.pageInfo.currentPage);
      setTotalPages(response.data.data.Page.pageInfo.lastPage);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <main css={parent}>
      <div css={headerContent}>
        <h1 className="title">List of Anime</h1>
        <div className="button">
          <button onClick={handleSelect} disabled={isShow}>
            {isSelect == false ? (
              <span>Select Anime</span>
            ) : (
              <span>Selected Anime: {[selected.length]}</span>
            )}
          </button>
          <button
            disabled={isSelect == false || isShow}
            onClick={addToCollection}
            css={
              isSelect == true && selected.length > 0 ? null : disabledButton
            }
          >
            Add to Collection
          </button>
        </div>
      </div>
      {!isSelect && (
        <div css={styles}>
          {data.map((item, index) => (
            <Card
              key={index}
              imageSrc={item.imageSrc}
              title={item.title}
              year={item.year}
              getData={() => getDataFromChild(item)}
              id={item.id}
            />
          ))}
        </div>
      )}

      {isSelect && (
        <div css={styles}>
          {data.map((item, index) => (
            <Card
              key={index}
              imageSrc={item.imageSrc}
              title={item.title}
              year={item.year}
              getSelect={() => handleSelected(item)}
              selected={selected}
              id={item.id}
            />
          ))}
        </div>
      )}

      {isShow && (
        <Modal closeModal={handleClose}>
          <div css={modal}>
            {!isCollection && (
              <select name="collection" id="collection">
                {collections.map((item: any) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
            {isCollection == true && (
              <div css={collectionStyle}>
                <h1 className="titleModal">Create a new collection</h1>
                <input
                  type="text"
                  placeholder="Collection Name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value.replace(/[^\w\s]/gi, ""))
                  }
                />
                {error && <span>Collection name is already exist</span>}
                <button className="buttonSave" onClick={addCollection}>
                  Add
                </button>
              </div>
            )}
            {isCollection == false && (
              <p onClick={createCollection} className="newCollection">
                Add new Collection?
              </p>
            )}
            {!isCollection && (
              <div css={footerModal}>
                <ul>
                  {selectedData.map((item, index) => (
                    <li key={item.id}>
                      {index + 1}. {item.title}
                    </li>
                  ))}
                </ul>
                {selected.length > 0 && (
                  <button onClick={handleSave}>Save</button>
                )}
              </div>
            )}
          </div>
        </Modal>
      )}

      {data.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
        />
      )}

      {data.length === 0 && isLoading && <div css={loadingSpinner}></div>}
    </main>
  );
}

const parent: SerializedStyles = css`
  height: 80rem;

  @media (max-width: 1024px) {
    height: fit-content;
  }
`;

const styles: SerializedStyles = css`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));

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

  .button {
    display: flex;
    column-gap: 1rem;
  }

  button {
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

  @media (max-width: 1024px) {
    flex-direction: column;

    .button {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
    }
  }
`;

const disabledButton = css`
  pointer-events: none;
  opacity: 0.5;
`;

const modal: SerializedStyles = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  select {
    padding: 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #f1f1f1;
    cursor: pointer;
    width: 30rem;
    font-size: 1rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style-type: none;
  }

  li {
    border-radius: 0.5rem;
    border: none;
    width: 30rem;
    font-size: 1rem;
  }

  button {
    margin-left: auto;
    padding: 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #f1f1f1;
    cursor: pointer;
    width: 10rem;
  }

  .newCollection {
    color: red;
    cursor: pointer;
    margin-bottom: 2rem;
    align-self: flex-end;
  }

  @media (max-width: 1024px) {
    select {
      width: 16rem;
    }

    ul {
      li {
        width: 16rem;
      }
    }

    button {
      width: 8rem;
      margin-top: 1rem;
    }

    .newCollection {
      margin-bottom: 1rem;
    }

    .titleModal {
      font-size: 1.2rem;
    }

    input {
      width: 16rem;
    }

    span {
      font-size: 0.8rem;
    }

    .buttonSave {
      width: 8rem;
    }
  }
`;

const loadingSpinner: SerializedStyles = css`
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-top: 4px solid #000;
  border-radius: 50%;
  width: 12rem;
  height: 12rem;
  animation: spin 1s linear infinite;
  margin: 2rem auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const collectionStyle: SerializedStyles = css`
  display: flex;
  flex-direction: column;

  .titleModal {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .buttonSave {
    padding: 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #f1f1f1;
    cursor: pointer;
    width: 10rem;
    margin-top: 1rem;
  }

  input {
    padding: 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #f1f1f1;
    width: 30rem;
    font-size: 1rem;
  }

  span {
    color: red;
    font-size: 1rem;
    margin-top: 1rem;
  }

  @media (max-width: 1024px) {
    input {
      width: 16rem;
    }

    .buttonSave {
      width: 8rem;
    }

    .titleModal {
      font-size: 1.2rem;
    }

    span {
      font-size: 0.8rem;
    }
  }
`;

const footerModal: SerializedStyles = css`
  display: flex;
  flex-direction: column;
`;
