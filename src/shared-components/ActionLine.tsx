import { Button, EntityTitle, type IconName } from "@blueprintjs/core";
import { useCallback } from "react";

interface iProps {
  iconName: IconName;
  url: string;
  text: React.JSX.Element;
}

function ActionLine({ iconName, url, text }: iProps) {
  const clickButton = useCallback(() => {
    window.open(url, "_self");
  }, [url]);
  const IconButton = (
    <Button
      size="small"
      icon={iconName}
      intent="primary"
      variant="minimal"
      onClick={clickButton}
    />
  );

  return <EntityTitle fill title={text} icon={IconButton} />;
}

export default ActionLine;
