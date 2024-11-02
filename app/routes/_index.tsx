import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const API_KEY = process.env.NEWS_API_KEY;
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("q") || "";

  const response = await fetch(
    `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await response.json();
  return json(data.articles);
}

export default function Index() {
  const news = useLoaderData<NewsData[]>();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="sr-only">Remix</span>
          </h1>
          <div className="h-[144px] w-[434px]">
            <img
              src="/logo-light.png"
              alt="Remix"
              className="block w-full dark:hidden"
            />
            <img
              src="/logo-dark.png"
              alt="Remix"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        {news.length > 0 &&
          news.map((news) => (
            <Card className="max-w-md max-h-96" key={news.title}>
              <CardHeader>
                <CardTitle>{news.title}</CardTitle>
                <CardDescription>{news.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{news.content}</p>
                <img
                  className="max-w-sm max-h-96"
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
  );
}
