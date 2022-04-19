import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function specificNews(props) {
  const { news } = props;
  return (
    <div>
      <h1>{news?.title}</h1>
      <b>{news?.description}</b>
      <h2>{news?.author}</h2>
      <img src={news?.urlToImage} alt={news?.urlToImage} />
      Content:
      <h3>{news?.content}</h3>
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

  let specificNews = {};
  news.articles.forEach((newsItem) => {
    if (newsItem.publishedAt === newsUrl) {
      specificNews = newsItem;
    }
  });
  return {
    props: { news: specificNews },
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
