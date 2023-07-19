/** @jsxImportSource @emotion/react */
"use client";
import Card from "@/components/card";
import { css, SerializedStyles } from "@emotion/react";
import { useRouter } from "next/navigation";

export default function Collection() {
  const data = [
    {
      id: 1,
      imageSrc: "/example.jpeg",
      title: "Collection 1",
      year: 2023,
    },
    {
      id: 2,
      imageSrc: "/example2.webp",
      title: "Collection 2",
      year: 2023,
    },
    {
      id: 3,
      imageSrc: "/example3.jpeg",
      title: "Collection 3",
      year: 2023,
    },
  ];

  const router = useRouter();

  const getDataFromChild = (item: any) => {
    console.log(item);
    // console.log(router);
    router.push(`/collection/${item.id}`);
  };
  return (
    <>
      <h1 css={titleStyle}>List of Collections</h1>
      <div css={styles}>
        {data.map((item, index) => (
          <Card
            key={index}
            imageSrc={item.imageSrc}
            title={item.title}
            getData={() => getDataFromChild(item)}
            id={item.id}
          />
        ))}
      </div>
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

const titleStyle: SerializedStyles = css`
  font-size: 2rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-left: 4rem;
`;
