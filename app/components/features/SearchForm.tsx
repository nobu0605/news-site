import { Form } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchForm() {
  return (
    <Form method="post" className="flex max-w-md gap-3 flex-col text-center">
      <Input name="query" type="text" placeholder="Search for news..." />
      <Button type="submit">Search</Button>
    </Form>
  );
}
