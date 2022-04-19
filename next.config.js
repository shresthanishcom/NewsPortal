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
  return imageUrls;
}

async function configuration() {
  const imagesUrls = await fetchImageUrl();
  const urls = imagesUrls.map((urls) => {
    if (urls?.search(/http:\/\//) === -1) {
      //https is found
      return urls?.slice(8, urls.indexOf("/", 8));
    } else if (urls?.search(/https:\/\//) === -1) {
      //if http is found
      return urls?.slice(7, urls.indexOf("/", 8));
    } else {
      return " ";
    }
  });
  console.log("image urls arer:", urls);
  const nextConfig = {
    images: {
      domains: urls,
    },
    reactStrictMode: true,
  };
  return nextConfig;
}
module.exports = configuration(); //object should be exported
