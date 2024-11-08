import { json } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import type { NewsData } from "@/types/news";
import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import { Layout } from "@/components/common/Layout";
import { NewsCard } from "@/components/features/NewsCard";
import { NewsErrorBoundary } from "@/components/features/NewsErrorBoundary";
import { SearchForm } from "@/components/features/SearchForm";

export const meta: MetaFunction = () => {
  return [
    { title: "News site" },
    { name: "description", content: "News site" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const API_KEY = process.env.NEWS_API_KEY;
  const formData = await request.formData();
  const query = formData.get("query");

  if (typeof query !== "string" || query.trim() === "") {
    return json({ error: "Invalid query" }, { status: 400 });
  }

  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${query}&pageSize=15&apiKey=${API_KEY}`
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
  const news = useActionData<NewsData[]>();

  return (
    <Layout>
      <div className="flex flex-col items-center gap-6">
        <SearchForm />
        <div className="flex flex-wrap gap-9 justify-center p-[10px]">
          {news &&
            news.length > 0 &&
            news.map((news) => <NewsCard key={news.title} news={news} />)}
        </div>
      </div>
    </Layout>
  );
}

export function ErrorBoundary() {
  return <NewsErrorBoundary />;
}
