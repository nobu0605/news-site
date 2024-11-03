import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { NewsData } from "@/types/news";
import type { MetaFunction } from "@remix-run/node";
import { Layout } from "@/components/common/Layout";
import { NewsCard } from "@/components/features/NewsCard";
import { NewsErrorBoundary } from "@/components/features/NewsErrorBoundary";

export const meta: MetaFunction = () => {
  return [
    { title: "News site" },
    { name: "description", content: "News site" },
  ];
};

export async function loader() {
  const API_KEY = process.env.NEWS_API_KEY;

  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );

  if (!response.ok) {
    throw new Response("Error", { status: response.status });
  }

  const data = await response.json();
  const articles = data.articles.filter(
    (article: NewsData) => !article.title.includes("Removed")
  );

  return json(articles);
}

export default function Index() {
  const news = useLoaderData<NewsData[]>();

  return (
    <Layout>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap gap-9 justify-center p-[10px]">
          {news.length > 0 &&
            news.map((news) => <NewsCard key={news.title} news={news} />)}
        </div>
      </div>
    </Layout>
  );
}

export function ErrorBoundary() {
  return <NewsErrorBoundary />;
}
