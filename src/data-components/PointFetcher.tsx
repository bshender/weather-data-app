import { useAtom } from "jotai";
import { pointData } from "../atoms";
import type { PointResponse } from "../api-response-types/point-response";
import errorHandler from "./errorHandler";

interface iProps {
  children: (pointData?: PointResponse) => React.ReactNode;
}

function PointFetcher({ children }: iProps) {
  const [{ data, error }] = useAtom(pointData);

  if (error) {
    errorHandler(error);
  }

  if (error) {
    errorHandler(error);
  }

  const res = data?.[0];
  const status = data?.[1] || 0;

  if (status >= 400) {
    // @ts-expect-error The error response has a title field, but the success response does not
    errorHandler(Error(res?.title || "Unknown Error"));
    return children();
  }

  return children(res);
}

export default PointFetcher;
