import { notification } from 'antd';

const Notification = (type, message, description) => {
  if (type === 'success')
    return notification.success({
      message: message,
      description: description,
      duration: 3
    });
  if (type === 'error')
    return notification.error({
      message: message,
      description: description,
      duration: 3
    });
  if (type === 'info')
    return notification.info({
      message: message,
      description: description,
      duration: 3
    });

}

export default Notification;