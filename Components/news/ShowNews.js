import React from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Sections/MainContent.module.scss";

import Image from "next/image";

export default function ShowNews(props) {
  const { mainNews } = props;

  const router = useRouter();

  const handleClick = (e, newsUrl) => {
    router.push({
      pathname: `/specificnews/${newsUrl}`,
    });
  };
  const showNews = () => {
    return mainNews?.map((news, index) => (
      <div key={index} onClick={(e) => handleClick(e, news.publishedAt)}>
        <div className={`${styles.newsContainer} container-fluid d-flex m-2`}>
          <div className={`${styles.newsDescription} `}>
            <h2>{news.title}</h2>
            {news.pubDate}
            <p>{`${news.description?.slice(0, 400)}...`}</p>
          </div>
          <div className={`${styles.newsImage}`}>
            <Image
              src={news.urlToImage === null ? "/favicon.ico" : news.urlToImage}
              alt={news.title?.slice(0, 10)}
              width={150}
              height={150}
            />
          </div>
        </div>
      </div>
    ));
  };
  return (
    <>
      <h1 className={styles.heading}>News</h1>
      {showNews()}
    </>
  );
}
