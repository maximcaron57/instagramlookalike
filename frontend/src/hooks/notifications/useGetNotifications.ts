import { useEffect, useState } from 'react';
import { NotificationEvent } from 'types/notifications';
import useFetchFromAPI from '../useFetchFromAPI';

export default function useGetNotifications() {
  const [notifications, setNotifications] = useState<NotificationEvent[]>([]);

  const { isLoading } = useFetchFromAPI(
    'getNotifications',
    setNotifications,
    null
  );

  useEffect(() => {
    const events = new EventSource(
      `${process.env.REACT_APP_BACKEND_URL}/events`,
      { withCredentials: true }
    );
    events.onmessage = (event) => {
      setNotifications((oldNotifications) => [
        JSON.parse(event.data),
        ...oldNotifications,
      ]);
    };
  }, []);

  return { notifications, setNotifications, isLoading };
}
