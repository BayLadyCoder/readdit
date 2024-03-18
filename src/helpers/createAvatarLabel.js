export const createAvatarLabel = (username) => {
  const splitUsername = username.split('-');
  return `${splitUsername[0][0]}${splitUsername[1][0]}`;
};
