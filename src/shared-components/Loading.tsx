import { NonIdealState, Spinner } from "@blueprintjs/core";

function Loading() {
  return (
    <NonIdealState
      className="non-ideal-state-component"
      icon={<Spinner />}
      title="Fetching Weather"
    />
  );
}

export default Loading;
