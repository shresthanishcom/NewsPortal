import newsData from "./datas/newsdata";

export default function newsapi(req, res) {
  res.status(200).json(newsData());
}
