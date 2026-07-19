export default async function handler(req, res) {
  try {
    const OWNER = "fmax39894-maker";
    const REPO = "Tele-botx";

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

    if (images.length === 0) {
      return res.status(404).json({
        error: "No images found"
      });
    }

    const random = images[Math.floor(Math.random() * images.length)];

    return res.redirect(302, random.download_url);

  } catch (err) {
    return res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }
}