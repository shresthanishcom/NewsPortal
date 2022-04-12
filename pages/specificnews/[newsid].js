import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function withparams(props) {
  return (
    <div>
      <h1>{props.news.title}</h1>
    </div>
  );
}
export async function getStaticProps(context) {
  const { newsid } = context.params;
  const news = await axios
    .post("http://localhost:3000/api/specificnews", { newsid: `${newsid}` })
    .then((res) => res.data)
    .catch((err) => console.log("error while fetching specific data"));

  return {
    props: { news },
  };
}

export async function getStaticPaths() {
  const countnews = await axios
    .get("http://localhost:3000/api/news")
    .then((res) => res.data.articles.length);
  let newsidArray = [];
  for (let i = 0; i < countnews; i++) {
    newsidArray.push({ params: { newsid: `${i}` } });
  }
  return {
    paths: newsidArray,
    fallback: true,
  };
}
