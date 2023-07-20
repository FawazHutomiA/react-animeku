/** @jsxImportSource @emotion/react */
"use client";
import Card from "@/components/card";
import Modal from "@/components/modal";
import { css, SerializedStyles } from "@emotion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState<Number[]>([]);

  const [data, setData] = useState([
    {
      id: 1,
      imageSrc: "/example.jpeg",
      title: "Card Title 1",
      year: 2023,
    },
    {
      id: 2,
      imageSrc: "/example2.webp",
      title: "Card Title 2",
      year: 2023,
    },
    {
      id: 3,
      imageSrc: "/example3.jpeg",
      title: "Card Title 3",
      year: 2023,
    },
    {
      id: 4,
      imageSrc: "/example.jpeg",
      title: "Card Title 4",
      year: 2023,
    },
    {
      id: 5,
      imageSrc: "/example2.webp",
      title: "Card Title 5",
      year: 2023,
    },
    {
      id: 6,
      imageSrc: "/example.jpeg",
      title: "Card Title 6",
      year: 2023,
    },
    {
      id: 7,
      imageSrc: "/example3.jpeg",
      title: "Card Title 7",
      year: 2023,
    },
    {
      id: 8,
      imageSrc: "/example.jpeg",
      title: "Card Title 8",
      year: 2023,
    },
    {
      id: 9,
      imageSrc: "/example2.webp",
      title: "Card Title 9",
      year: 2023,
    },
    {
      id: 10,
      imageSrc: "/example.jpeg",
      title: "Card Title 10",
      year: 2023,
    },
  ]);

  const collections = JSON.parse(localStorage.getItem("collections") || "[]");

  console.log(typeof collections, collections);

  const router = useRouter();

  const [isSelect, setIsSelect] = useState(false);

  const [isShow, setIsShow] = useState(false);

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

  const handleClose = () => {
    setIsShow(!isShow);
  };

  const handleSave = () => {
    // save data anime to collection in localstorage
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
      anime: selected,
    };

    const newCollections = collections.filter(
      (item: any) => item.id != collectionId.value
    );

    newCollections.push(data);

    localStorage.setItem("collections", JSON.stringify(newCollections));

    setIsShow(!isShow);

    setSelected([]);

    setIsSelect(!isSelect);
  };

  return (
    <main>
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
            <select name="collection" id="collection">
              {collections.map((item: any) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <ul>
              {data
                .filter((item) => selected.includes(item.id))
                .map((item, index) => (
                  <li key={item.id}>
                    {index + 1}. {item.title}
                  </li>
                ))}
            </ul>
            {selected.length > 0 && <button onClick={handleSave}>Save</button>}
          </div>
        </Modal>
      )}
    </main>
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
    // set button to the right side of the modal content (flex-end)
    margin-left: auto;
    padding: 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #f1f1f1;
    cursor: pointer;
    width: 10rem;
  }
`;
