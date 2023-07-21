/** @jsxImportSource @emotion/react */
"use client";
import { css, SerializedStyles } from "@emotion/react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Detail({ params }: { params: { id: number } }) {
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (id: number) => {
    setIsLoading(true);

    try {
      const response = await axios.post("https://graphql.anilist.co", {
        query: `
      query ($id: Int) { # Define which variables will be used in the query (id)
          Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
            id
            title {
              romaji
              english
              native
            }
            coverImage {
              large
            }
            startDate {
              year
              month
              day
            }
            episodes
            description
            isLicensed
            meanScore
            popularity
            trending
            favourites
            type
            isAdult
            siteUrl
            bannerImage
          }
        }
      `,

        variables: {
          id: params.id,
        },
      });

      const animeData = response.data.data.Media;

      setData(animeData);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(params.id);
  }, []);

  return (
    <div css={styles}>
      {isLoading && Object.keys(data).length == 0 && (
        <div css={loadingSpinner}></div>
      )}

      {!isLoading && Object.keys(data).length > 0 && (
        <div>
          <img
            src={data?.bannerImage ?? "/baner.jpeg"}
            alt=""
            className="banner"
          />

          <div className="content">
            <img
              src={data?.coverImage?.large ?? "/example.jpeg"}
              alt=""
              className="imageContent"
            />
            <div className="description">
              <h1>{data?.title?.english ?? "No Title"}</h1>
              <p
                dangerouslySetInnerHTML={{ __html: data?.description ?? "-" }}
              ></p>
              <div css={detailStyle}>
                <p>Episode: {data?.episodes ?? 0}</p>
                <p>Favourites: {data?.favourites ?? 0}</p>
                <p>Popularity: {data?.popularity ?? 0}</p>
                <p>Trending: {data?.trending ?? 0}</p>
                <p>
                  Licence :{" "}
                  {data?.isLicencsed ? (
                    <span>Licensed</span>
                  ) : (
                    <span>Not Licensed</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: SerializedStyles = css`
  width: 100%;
  height: 70rem;

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

    p {
      color: #4a4a4a;
      margin-top: 1rem;
      font-size: 1.2rem;
    }
  }

  @media (max-width: 1024px) {
    .content {
      grid-template-columns: repeat(1, minmax(0, 1fr));
      margin-left: 0;
      margin-right: 0;
    }

    .imageContent {
      width: 100%;
      height: 100%;
      aspect-ratio: 9/16;
      object-fit: fill;
      border-radius: 0.5rem;
    }

    .description {
      margin-left: 0;
      width: 100%;
      grid-column: span 1 / span 1;
      margin-top: 1rem;
    }

    .banner {
      height: 20rem;
    }
  }
`;

const detailStyle: SerializedStyles = css`
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
  column-gap: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: #4a4a4a;

  p {
    background-color: #f1f1f1;
    padding: 0.5rem;
    border-radius: 0.5rem;
    width: fit-content;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const loadingSpinner: SerializedStyles = css`
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-top: 4px solid #000;
  border-radius: 50%;
  width: 12rem;
  height: 12rem;
  animation: spin 1s linear infinite;
  margin: 8rem auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
