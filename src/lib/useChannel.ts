import { Dispatch, SetStateAction, useEffect, useState } from "react";

export type Listener<T> = Dispatch<SetStateAction<T>>;
export type Channel<T> = {
  listen: (newListener: Listener<T>) => void;
  send: (value: T) => void;
};

export const channel = <T>(): Channel<T> => {
  let listener: Listener<T> | null = null;

  const send = (value: SetStateAction<T>) => listener?.(value);
  const listen = (newListener: Listener<T>) => (listener = newListener);

  return { listen, send };
};

export const useChannel = <T>(channel: Channel<T>): T | null => {
  const [value, setValue] = useState<T>(null!);

  useEffect(() => {
    channel.listen(setValue);
  }, []);

  return value;
};
