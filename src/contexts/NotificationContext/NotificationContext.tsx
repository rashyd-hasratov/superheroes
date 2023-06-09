import React, { useCallback, useMemo, useState } from 'react';

import { NotificationType } from '../../types/NotificationType';

interface IContextValue {
  notificationType: NotificationType,
  setNotificationType: React.Dispatch<React.SetStateAction<NotificationType>>,
  notificationMessage: string,
  setNotificationMessage: React.Dispatch<React.SetStateAction<string>>,
  showNotification: (
    notificationMessage: string,
    notificationType: NotificationType,
  ) => void,
}

export const NotificationContext = React.createContext<IContextValue>({
  notificationType: NotificationType.SUCCESS,
  setNotificationType: () => {},
  notificationMessage: '',
  setNotificationMessage: () => {},
  showNotification: () => {},
});

type Props = {
  children: React.ReactNode,
};

export const NotificationProvider: React.FC<Props> = ({ children }) => {
  const [
    notificationType,
    setNotificationType
  ] = useState<NotificationType>(NotificationType.SUCCESS);
  const [notificationMessage, setNotificationMessage] = useState('');

  const showNotification = useCallback((
    notificationMessage: string,
    notificationType: NotificationType,
  ) => {
    setNotificationMessage(notificationMessage);
    setNotificationType(notificationType);
    setTimeout(() => {
      setNotificationMessage('');
    }, 3000);
  }, []);

  const contextValue = useMemo(() => {
    return {
      notificationType,
      setNotificationType,
      notificationMessage,
      setNotificationMessage,
      showNotification,
    };
  }, [
    notificationMessage,
    showNotification,
    notificationType,
  ]);

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};