import { useContext } from 'react';
import classNames from 'classnames';

import { NotificationContext } from '../../contexts/NotificationContext';
import { NotificationType } from '../../types/NotificationType';

import styles from './Notification.module.scss';

export const Notification = () => {
  const {
    notificationType,
    notificationMessage,
  } = useContext(NotificationContext);

  return (
    <div className={classNames(
      styles.notification,
      { [styles.notification_success]: notificationType === NotificationType.SUCCESS },
      { [styles.notification_danger]: notificationType === NotificationType.DANGER },
    )}>
      {notificationMessage}
    </div>
  );
};