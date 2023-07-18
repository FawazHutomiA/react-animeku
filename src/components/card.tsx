/** @jsxImportSource @emotion/react */
"use client";
import { css, SerializedStyles } from "@emotion/react";
import Badge from "./badge";

interface CardProps {
  imageSrc: string;
  title: string;
  year?: number;
  getData?: () => void;
  getSelect?: () => void;
  selected?: Number[];
  id: Number;
}

const Card = ({
  imageSrc,
  title,
  year,
  getData,
  getSelect,
  selected,
  id,
}: CardProps) => {
  const handleClick = () => {
    if (getData) {
      getData();
    }
    if (getSelect) {
      getSelect();
    }
  };

  return (
    <div css={styles} className="card" onClick={handleClick}>
      <img src={imageSrc} alt="Card Cover" className="cardImage" />
      <div className="cardContent">
        <h2 className="cardTitle">{title}</h2>
        <p className="cardYear">{year}</p>
      </div>
      {selected && selected.includes(id) && (
        <div className="badge">
          <Badge />
        </div>
      )}
    </div>
  );
};

const styles: SerializedStyles = css`
  display: flex;
  flex-direction: column;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  background-color: transparent;
  width: 100%;
  position: relative;
  cursor: pointer;

  .cardImage {
    width: 100%;
    aspect-ratio: 9/16;
    object-fit: fill;
    border-radius: 0.5rem;
  }

  .cardContent {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    color: white;
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .cardTitle {
    font-size: 1.2rem;
    padding-bottom: 0.5rem;
  }

  .cardYear {
    font-size: 0.8rem;
  }

  .badge {
    position: absolute;
    // set the badge to the center of the card
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default Card;
