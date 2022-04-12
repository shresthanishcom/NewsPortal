import newsData from "./datas/newsdata";

export default function specificnewsApi(req, res) {
  const { newsid } = req.body;
  const newsList = newsData().articles;
  const specificNews = newsList.find((item) => {
    if (+item.news_id === +newsid) {
      return item;
    } else {
      return "";
    }
  });
  res.status(200).json(specificNews);
}
