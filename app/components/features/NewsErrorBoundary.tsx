import { useRouteError } from "@remix-run/react";
import type { RouteError } from "@/types/error";
import { Layout } from "@/components/common/Layout";

export function NewsErrorBoundary() {
  const error = useRouteError() as RouteError;

  if (error.status === 400) {
    return (
      <Layout>
        <div className="flex items-center justify-center flex-col mt-5">
          <div className="flex max-w-md gap-3 flex-col">
            <h1>Bad Request</h1>
            <p>Oh no! Something went wrong!</p>
            <p>Please search again</p>
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
