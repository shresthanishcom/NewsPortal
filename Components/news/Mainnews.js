import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Mainnews(props) {
  const { mainNews } = props;

  const router = useRouter();

  const handleClick = (e, newsid) => {
    router.push({
      pathname: `/specificnews/${newsid}`,
    });
  };
  const showNews = () => {
    return mainNews.map((news, index) => (
      <div key={index} onClick={(e) => handleClick(e, news.news_id)}>
        <h2>{news.title}</h2>
        {news.pubDate}
        <p>{`${news.description?.slice(0, 400)}...`}</p>
      </div>
    ));
  };
  return (
    <>
      <h1>Headlines</h1>
      {showNews()}
    </>
  );
}
