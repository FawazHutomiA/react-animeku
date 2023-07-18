/** @jsxImportSource @emotion/react */
"use client";
import { css, SerializedStyles } from "@emotion/react";

export default function Badge() {
  return (
    <div css={styles}>
      <h1>Selected</h1>
    </div>
  );
}

const styles: SerializedStyles = css`
  border: 1px solid transparent;
  border-radius: 0.5rem;
  background-color: #f1f1f1;
  width: 100%;
  padding: 0.8rem 1.3rem;

  h1 {
    font-size: 1rem;
    font-weight: 600;
  }
`;
