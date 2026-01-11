import type { NotificationInstance } from "antd/es/notification/interface";
import type { NotificationType } from "./types";

export const setIsCopiedFactory =
  (api: NotificationInstance) =>
  (
    type: NotificationType,
    title: string,
    message?: string,
    duration?: number,
  ) => {
    api[type]({
      title: title,
      description: message,
      duration: duration ?? 2,
    });
  };
