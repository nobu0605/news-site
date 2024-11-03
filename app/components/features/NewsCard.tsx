import type { NewsData } from "@/types/news";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type Props = {
  news: NewsData;
};

export function NewsCard({ news }: Props) {
  return (
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
  );
}
