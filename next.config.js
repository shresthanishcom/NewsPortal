/** @type {import('next').NextConfig} */

async function fetchImageUrl() {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=tesla&from=${year}-${month}-${day}&sortBy=publishedAt&apiKey=3ebfe18db721404dbfde22440f0f2d18`
  );
  const data = await response.json();
  const imageUrls = data.articles.map((news) => {
    return news.urlToImage;
  });
  const businessNews = await fetch(
    `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=3ebfe18db721404dbfde22440f0f2d18`
  );
  const businessData = await businessNews.json();
  const businessNewsUrl = businessData.articles.map((news) => {
    return news.urlToImage;
  });
  const allUrls = imageUrls.concat(businessNewsUrl);
  console.log("all urls:", allUrls.length);
  return allUrls;
}

async function configuration() {
  const imagesUrls = await fetchImageUrl();
  console.log("images withoud slice are:", imagesUrls);
  let urls = [];
  imagesUrls.forEach((url) => {
    if (url?.search(/http:\/\//) === -1) {
      //https is found
      urls.push(url?.slice(8, url.indexOf("/", 8)));
    } else if (url?.search(/https:\/\//) === -1) {
      //if http is found
      urls.push(url?.slice(7, url.indexOf("/", 8)));
    }
  });
  console.log("image urls arer:", urls.length);
  const nextConfig = {
    images: {
      domains: urls,
    },
    reactStrictMode: true,
  };
  return nextConfig;
}
module.exports = configuration(); //object should be exported
