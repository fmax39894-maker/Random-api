export default async function handler(req, res) {
  const OWNER = "fmax39894-maker";
  const REPO = "Random-api";

  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents`;

  const response = await fetch(url);
  const data = await response.json();

  return res.json({
    url,
    status: response.status,
    data
  });
}