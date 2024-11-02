import { json } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Layout } from "@/components/common/Layout";
import { SearchForm } from "@/components/features/SearchForm";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type RouteError = {
  data: string;
  internal: boolean;
  status: number;
  statusText: string;
};

type NewsData = {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export const meta: MetaFunction = () => {
  return [
    { title: "News site" },
    { name: "description", content: "News site" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const API_KEY = process.env.NEWS_API_KEY;
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("q") || "";

  if (!searchQuery) {
    return new Response(null, { status: 200 });
  }

  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=15&apiKey=${API_KEY}`
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
        <SearchForm />
        <div className="flex flex-wrap gap-9 justify-center p-[10px]">
          {news.length > 0 &&
            news.map((news) => (
              <Card className="max-w-[340px] break-all" key={news.title}>
                <CardHeader>
                  <CardTitle>{news.title}</CardTitle>
                  <CardDescription>{news.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <p>{news.content}</p>
                  <img
                    className="max-w-[250px] max-h-96"
                    width={400}
                    height={400}
                    src={news.urlToImage}
                    alt={news.title}
                  />
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </Layout>
  );
}

export function ErrorBoundary() {
  const error = useRouteError() as RouteError;

  if (error.status === 400) {
    return (
      <Layout>
        <div className="flex items-center justify-center flex-col mt-5">
          <div className="flex max-w-md gap-3 flex-col">
            <h1>Bad Request</h1>
            <p>Oh no! Something went wrong!</p>
            <p>Please search again</p>
            <SearchForm />
          </div>
        </div>
      </Layout>
    );
  }

  if (error.status === 429) {
    return (
      <Layout>
        <div className="flex items-center justify-center flex-col mt-5">
          <div className="flex max-w-md gap-3 flex-col">
            <h1>Too many Requests!</h1>
            <p>Please search again later</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>Oh no! Something went wrong!</h1>
    </Layout>
  );
}
