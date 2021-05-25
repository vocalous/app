// Uses Tiny URL API which is currently public and free.

const API = 'https://tinyurl.com/api-create.php?url=';

export async function shortenLink(longUrl) {
  const url = `${API}${encodeURIComponent(longUrl)}`;
  const response = await fetch(url);
  if (response.ok) {
    const shortUrl = await response.text();
    return shortUrl;
  } else {
    console.error('Error response from Tiny URL', response);
    return undefined;
  }
}
