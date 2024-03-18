export const saveUserDataToSS = (user) => {
  sessionStorage.setItem(
    'user',
    JSON.stringify({
      ...user,
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

export const updateUserVotesInSS = (votes) => {
  const user = getUserDataFromSS();
  sessionStorage.setItem(
    'user',
    JSON.stringify({
      ...user,
      votes,
    })
  );
};
