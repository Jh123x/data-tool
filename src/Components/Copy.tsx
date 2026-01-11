import type { NotificationInstance } from "antd/es/notification/interface";
import type { NotificationType } from "./types";

export interface NotificationProps {
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

export const setIsCopiedFactory =
  (api: NotificationInstance) =>
  ({ type, title, message, duration }: NotificationProps) => {
    api[type]({
      title: title,
      description: message,
      duration: duration ?? 2,
    });
  };
