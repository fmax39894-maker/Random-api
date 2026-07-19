export default async function handler(req, res) {
  const OWNER = "fmax39894-maker";
  const REPO = "Tele-botx";

  try {
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents`,
      {
        headers: {
          "User-Agent": "Vercel"
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    const images = data.filter(file =>
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
    );

    if (images.length === 0) {
      return res.status(404).json({
        error: "No images found"
      });
    }

    const random = images[Math.floor(Math.random() * images.length)];

    return res.status(200).json({
      image: random.download_url,
      filename: random.name
    });

  } catch (e) {
    return res.status(500).json({
      error: e.message
    });
  }
}