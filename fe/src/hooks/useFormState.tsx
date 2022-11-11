import { useState } from "react";

export const useFormState = <T,>(obj: T) => {
  const [state, setState] = useState(obj);

  const changeProperty = (prop: string, value: string | number) => {
    setState((prev: any) => ({ ...prev, [prop]: value }));
  };

  const ret: [typeof state, typeof changeProperty] = [state, changeProperty];
  return ret;
};
