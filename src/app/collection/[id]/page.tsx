/** @jsxImportSource @emotion/react */
"use client";
import Card from "@/components/card";
import { css, SerializedStyles } from "@emotion/react";
import { useRouter } from "next/navigation";

export default function CollectionDetail({
  params,
}: {
  params: { id: number };
}) {
  // data from localstorage collections array of object with id, name, anime
  const collections = JSON.parse(localStorage.getItem("collections") || "[]");
  const id = Number(params.id);
  const data = collections.find((item: any) => item.id === id);
  const anime = data.anime;
  const router = useRouter();

  const getDataFromChild = (item: any) => {
    router.push(`/detail/${item.id}`);
  };

  return (
    <>
      <h1 css={titleStyle}>{data.name}</h1>
      <div css={styles}>
        {anime.map((item: any, index: number) => (
          <Card
            key={index}
            imageSrc={item.imageSrc}
            title={item.title}
            year={item.year}
            id={item.id}
            getData={() => getDataFromChild(item)}
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
