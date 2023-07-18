/** @jsxImportSource @emotion/react */
"use client";
import { css, SerializedStyles } from "@emotion/react";

export default function CollectionDetail({
  params,
}: {
  params: { id: number };
}) {
  return (
    <div css={styles}>
      <img src="/baner.jpeg" alt="" className="banner" />
      <div className="content">
        <img src="/example.jpeg" alt="" className="imageContent" />
        <div className="description">
          <h1>Wibu Bau Bawang Collection</h1>
          <p>Description</p>
        </div>
      </div>
    </div>
  );
}

const styles: SerializedStyles = css`
  width: 100%;
  height: 100vh;

  .banner {
    width: 100%;
    height: 26rem;
    object-fit: cover;
  }

  .content {
    background-color: white;
    padding: 1rem;
    height: fit-content;
    width: auto;
    margin-left: 3rem;
    margin-right: 3rem;
    border-radius: 0.5rem;
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    position: relative;
    top: -8rem;
  }

  .imageContent {
    width: 80%;
    aspect-ratio: 9/16;
    object-fit: fill;
    border-radius: 0.5rem;
    height: 30rem;
  }

  .description {
    margin-left: -4rem;
    width: auto;
    grid-column: span 2 / span 2;
  }
`;
