/** @jsxImportSource @emotion/react */
"use client";
import { css, SerializedStyles } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div css={styles}>
      <span>© 2023, Bandung</span>
    </div>
  );
}

const styles: SerializedStyles = css`
  display: flex;
  background-color: black;
  justify-content: center;
  align-items: center;
  color: white;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-top: 2rem;
`;
