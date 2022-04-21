import React from "react";
import axios from "axios";

import style from "../../styles/Sections/SpecificNews.module.scss";
import ShowNews from "../../Components/news/ShowNews";

export default function specificNews(props) {
  const { news, businessNews } = props;
  return (
    <div>
      <div className={`${style.container} container d-flex`}>
        <div className={`${style.specificNews}`}>
          <h1>{news?.title}</h1>
          <div className={style.specificNewsImage}>
            <img src={news?.urlToImage} alt={news?.urlToImage} />
          </div>
          <h2>{news?.author}</h2>
          <div className={`${style.newsDescription}`}>
            {news?.description}
            <h3>{news?.content}</h3>
          </div>
        </div>
        <div className={`${style.otherNews}`}>
          <ShowNews mainNews={businessNews} />
        </div>
      </div>
    </div>
  );
}
export async function getStaticProps(context) {
  const { newsUrl } = context.params;
  const d = new Date();

  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const news = await axios
    .get(
      `https://newsapi.org/v2/everything?q=tesla&from=${year}-${month}-${day}&sortBy=publishedAt&apiKey=3ebfe18db721404dbfde22440f0f2d18`
    )
    .then((res) => res.data)
    .catch((err) => {
      console.log("error while fetching specific data");
      return { articles: [] };
    });
  const businessNews = await axios
    .get(
      `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=3ebfe18db721404dbfde22440f0f2d18`
    )
    .then((res) => res.data?.articles)
    .catch((err) => {
      console.log(
        "error occured while fetching business news in specific news:",
        err
      );
      return { articles: [] };
    });
  let specificNews = {};
  news.articles.forEach((newsItem) => {
    if (newsItem.publishedAt === newsUrl) {
      specificNews = newsItem;
    }
  });
  return {
    props: { news: specificNews, businessNews },
  };
}

export async function getStaticPaths() {
  let newsidArray = [];
  for (let i = 0; i < 1; i++) {
    newsidArray.push({ params: { newsUrl: `0` } });
  }
  return {
    paths: newsidArray,
    fallback: true,
  };
}
