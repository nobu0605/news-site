import { Link } from "@remix-run/react";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div>
      <header className="flex flex-col items-center bg-black p-2 gap-2 text-white mb-4">
        <Link to={`/`}>
          <h1 className="leading text-2xl font-bold">News site</h1>
        </Link>
        <div className="flex flex-row gap-3">
          <p>Top news</p>
          <Link to={`/?q=Bussiness`}>
            <p>Bussiness</p>
          </Link>
          <Link to={`/?q=Science`}>
            <p>Science</p>
          </Link>
          <Link to={`/?q=Politics`}>
            <p>Politics</p>
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}