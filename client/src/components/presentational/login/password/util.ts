export const getEmailOrPasswordError = (email: string, passowrd: string) => {
  if (email === '') return 'Email cannot be empty';
  // eslint-disable-next-line no-useless-escape
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return 'Invalid email address';

  if (passowrd === '') return 'Password cannot be empty';
  if (passowrd.length < 5) return 'Password should have minimum length of 5';

  return null;
};

export const getEmailError = (email: string) => {
  if (email === '') return 'Email cannot be empty';
  // eslint-disable-next-line no-useless-escape
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return 'Invalid email address';
  return null;
};
