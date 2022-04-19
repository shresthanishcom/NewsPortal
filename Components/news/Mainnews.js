import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/Sections/MainContent.module.scss";
import testing from "./testing";

import Image from "next/image";

export default function Mainnews(props) {
  const { mainNews } = props;

  const router = useRouter();

  const handleClick = (e, newsUrl) => {
    router.push({
      pathname: `/specificnews/${newsUrl}`,
    });
  };
  const showNews = () => {
    return mainNews.map((news, index) => (
      <div key={index} onClick={(e) => handleClick(e, news.publishedAt)}>
        <div className="news-container">
          <div className="news-image">
            <Image
              src={news.urlToImage}
              alt={news.title?.slice(0, 10)}
              width={400}
              height={400}
            />
          </div>
          <div className="news-description">
            <h2>{news.title}</h2>
            {news.pubDate}
            <p>{`${news.description?.slice(0, 400)}...`}</p>
          </div>
        </div>
      </div>
    ));
  };
  return (
    <>
      <h1 className={styles.heading}>Headlines</h1>
      {showNews()}
    </>
  );
}
