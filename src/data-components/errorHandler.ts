import { OverlayToaster } from "@blueprintjs/core";

const overlayToaster = await OverlayToaster.create({ position: "bottom" });

function errorHandler(error: Error) {
  console.error(error);
  overlayToaster.show({
    icon: "error",
    intent: "danger",
    message: error.message,
  });
}

export default errorHandler;
