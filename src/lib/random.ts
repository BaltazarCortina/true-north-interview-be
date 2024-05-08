export const getRandomString = async (length: number) => {
  const baseUrl = 'https://www.random.org/strings/';

  const url = `${baseUrl}?num=1&len=${length}&digits=off&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new`;

  const response = await fetch(url);
  return response.text();
};
