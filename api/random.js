export default async function handler(req, res) {
  const OWNER = "fmax39894-maker";
  const REPO = "Random-api";

  const response = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents`
  );

  const data = await response.json();

  if (!Array.isArray(data)) {
    return res.status(500).json(data);
  }

  const images = data.filter(file =>
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
  );

  return res.json(images);

const images = data.filter(file =>
  /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
);

const random = images[Math.floor(Math.random() * images.length)];

return res.status(200).json({
  image: random.download_url
});
}