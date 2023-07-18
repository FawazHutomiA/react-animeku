/** @jsxImportSource @emotion/react */
"use client";
import Card from "@/components/card";
import { css, SerializedStyles } from "@emotion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState<Number[]>([]);
  const data = [
    {
      id: 1,
      imageSrc: "/example.jpeg",
      title: "Card Title",
      year: 2023,
    },
    {
      id: 2,
      imageSrc: "/example2.webp",
      title: "Card Title",
      year: 2023,
    },
    {
      id: 3,
      imageSrc: "/example3.jpeg",
      title: "Card Title",
      year: 2023,
    },
    {
      id: 4,
      imageSrc: "/example.jpeg",
      title: "Card Title",
      year: 2023,
    },
    {
      id: 5,
      imageSrc: "/example2.webp",
      title: "Card Title",
      year: 2023,
    },
    {
      id: 6,
      imageSrc: "/example.jpeg",
      title: "Card Title",
      year: 2023,
    },
    {
      id: 7,
      imageSrc: "/example3.jpeg",
      title: "Card Title",
      year: 2023,
    },
    {
      id: 8,
      imageSrc: "/example.jpeg",
      title: "Card Title",
      year: 2023,
    },
    {
      id: 9,
      imageSrc: "/example2.webp",
      title: "Card Title",
      year: 2023,
    },
    {
      id: 10,
      imageSrc: "/example.jpeg",
      title: "Card Title",
      year: 2023,
    },
  ];

  const router = useRouter();

  const [isSelect, setIsSelect] = useState(false);

  const getDataFromChild = (item: any) => {
    console.log(item.id);
    // console.log(router);
    router.push(`/detail/${item.id}`);
  };

  const handleSelect = () => {
    setIsSelect(!isSelect);
    console.log(isSelect);
  };

  const handleSelected = (item: any) => {
    if (selected.includes(item.id)) {
      setSelected(selected.filter((id) => id !== item.id));
    } else {
      setSelected([...selected, item.id]);
    }

    console.log(selected);
  };

  const cobaTest = () => {
    console.log("coba test");
  };

  return (
    <main>
      <div css={headerContent}>
        <h1 className="title">List of Anime</h1>
        <div className="button">
          <button onClick={handleSelect}>Select Anime</button>
          <button
            disabled={isSelect == false}
            onClick={cobaTest}
            css={isSelect == false ? disabledButton : null}
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
