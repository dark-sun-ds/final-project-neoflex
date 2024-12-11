import axios from "axios";

type NewsArticleAnswer = {
  source: {
    id: string;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export type NewsArticle = {
  urlToImage: string;
  title: string;
  url: string;
  description: string;
};

type SetArticles = React.Dispatch<React.SetStateAction<NewsArticle[]>>;

let result: NewsArticleAnswer[] | undefined = [];
let timerId: number;

export async function fetchNews() {
  const options = {
    method: "GET",
    url: "https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=21",
    headers: {
      "x-api-key": "187a157964944d64852acbb3c9556ec1",
    },
  };

  try {
    const response = await axios.request(options);
    console.log("fetch");

    return response.data.articles as NewsArticleAnswer[];
  } catch (error) {
    console.error(error);
  }
}

export async function updateNews(setArticles: SetArticles) {
  try {
    result = await fetchNews();
    localStorage.setItem("news", JSON.stringify(result));
    if (!result) throw new Error("News fetch failed");

    timerId = setTimeout(updateNews, 15 * 60 * 1000);
    localStorage.setItem(
      "news-timeout",
      String(new Date().getTime() + 15 * 60 * 1000)
    );

    console.log("update");

    setArticles(processNews(result));
  } catch (error) {
    console.error(error);
  }
}

function processNews(news: NewsArticleAnswer[]) {
  const processedNews: NewsArticle[] = news.map((article) => ({
    urlToImage: article.urlToImage,
    title: article.title,
    url: article.url,
    description: article.description,
  }));
  console.log("process");

  return processedNews;
}

export function init(setArticles: SetArticles) {
  const newsLS = localStorage.getItem("news");
  const news: NewsArticleAnswer[] = newsLS ? JSON.parse(newsLS) : [];
  const newsTimeout = localStorage.getItem("news-timeout");

  console.log("1.", { newsTimeout, news });

  if (!news || news.length === 0)  {
    updateNews(setArticles);
  }

  if (news && new Date().getTime() < Number(newsTimeout)) {
    clearTimeout(timerId);
    const remainingTime = Number(newsTimeout) - new Date().getTime();
    timerId = setTimeout(updateNews, remainingTime);
    localStorage.setItem(
      "news-timeout",
      (new Date().getTime() + remainingTime).toString()
    );
    console.log(
      "news-timeout doesn't expired ",
      remainingTime / 1000,
      " seconds left"
    );
    processNews(news);
  } else if (news && new Date().getTime() >= Number(newsTimeout)) {
    console.log("news-timeout expired");
    updateNews(setArticles);
  }

  console.log("init");
}
