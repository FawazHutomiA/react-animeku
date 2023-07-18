/** @jsxImportSource @emotion/react */
"use client";
import { css, SerializedStyles } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const goToCollection = () => {
    router.push("/collection");
  };

  return (
    <div css={styles}>
      <Link href="/" className="logo">
        <img src="/logo.png" alt="logo" />
        <h1 className="textLogo">Animeku</h1>
      </Link>
      <h1 className="collectionStyle" onClick={goToCollection}>
        Collection
      </h1>
    </div>
  );
}

const styles: SerializedStyles = css`
  display: flex;
  background-color: black;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 8rem;
  padding-right: 8rem;
  justify-content: space-between;
  align-items: center;

  .logo {
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    cursor: pointer;
  }

  img {
    width: 4rem;
    height: 4rem;
  }

  .textLogo {
    color: white;
    font-size: 2rem;
  }

  .collectionStyle {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    cursor: pointer;
    position: relative;
  }

  .collectionStyle::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: white;
    transition: width 0.3s ease-in-out;
  }

  .collectionStyle:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    padding-left: 2rem;
    padding-right: 2rem;

    .collectionStyle {
      font-size: 1rem;
    }

    .textLogo {
      font-size: 1.5rem;
    }

    img {
      width: 2rem;
      height: 2rem;
    }
  }

  @media (max-width: 480px) {
    padding-left: 1rem;
    padding-right: 1rem;

    .collectionStyle {
      font-size: 0.8rem;
    }

    .textLogo {
      font-size: 1rem;
    }

    img {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  @media (max-width: 320px) {
    padding-left: 0.5rem;
    padding-right: 0.5rem;

    .collectionStyle {
      font-size: 0.6rem;
    }

    .textLogo {
      font-size: 0.8rem;
    }

    img {
      width: 1rem;
      height: 1rem;
    }
  }
`;
