import React from "react";

export default function Mainnews(props) {
  const { mainNews } = props;
  const handleClick = (e) => {};
  const showNews = () => {
    return mainNews.map((news, index) => (
      <div key={index} onClick={(e) => handleClick(e)}>
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
