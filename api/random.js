export default async function handler(req, res) {
  const OWNER = "fmax39894-maker";
  const REPO = "Random-api";

  try {
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents`
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Failed to fetch repository contents"
      });
    }

    const files = await response.json();

    const images = files.filter(file =>
      file.type === "file" &&
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
    );

    if (images.length === 0) {
      return res.status(404).json({
        error: "No images found"
      });
    }

    const random = images[Math.floor(Math.random() * images.length)];

    res.writeHead(302, {
      Location: random.download_url
    });

    res.end();

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
}