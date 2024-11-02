import { Link } from "@remix-run/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <form className="flex max-w-md gap-3 flex-col text-center">
      <Input type="text" onChange={(e) => setSearchQuery(e.target.value)} />
      <Link to={`/?q=${searchQuery}`}>
        <Button type="submit">Search</Button>
      </Link>
    </form>
  );
}
