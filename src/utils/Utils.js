export const getPerformedTitle = (slug) => {
  const title = slug.toString().replaceAll('-', ' ');
  return title.charAt(0).toUpperCase() + title.slice(1);
};

export const limitCharacters = (strValue, limit) => {
  if (String(strValue).length < limit) return strValue;
  return String(strValue).substring(0, limit) +  ' ' + '...';
};

export async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}