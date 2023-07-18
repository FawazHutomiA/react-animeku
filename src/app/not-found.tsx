/** @jsxImportSource @emotion/react */
"use client";
import { css, SerializedStyles } from "@emotion/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div css={containerStyles}>
      <h1 css={titleStyles}>404 - Page Not Found</h1>
      <p css={descStyles}>The page you are looking for does not exist.</p>
      <Link css={buttonStyles} href="/">
        Back to Home
      </Link>
    </div>
  );
}

const containerStyles: SerializedStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const titleStyles: SerializedStyles = css`
  margin-bottom: 1rem;
  font-size: 5rem;
  font-weight: bold;
`;

const descStyles: SerializedStyles = css`
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: normal;
`;

const buttonStyles: SerializedStyles = css`
  background-color: teal;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
`;
