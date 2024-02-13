export const saveUserDataToSS = (user) => {
  sessionStorage.setItem(
    'user',
    JSON.stringify({
      token: user.token,
      id: user.id,
      username: user.username,
      cakeDay: user.cakeDay,
      isLoggedIn: true,
    })
  );
};

export const removeUserDataFromSS = () => {
  sessionStorage.removeItem('user');
};

export const getUserDataFromSS = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  return user;
};
