import axios from "axios";

const OWNER = "fmax39894-maker";
const REPO = "Tele-botx";
const BRANCH = "main";

export default async function handler(req, res) {
  try {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents`;

    const { data } = await axios.get(url);

    const images = data.filter(file =>
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
    );

    if (images.length === 0) {
      return res.status(404).json({
        error: "No images found"
      });
    }

    const random = images[Math.floor(Math.random() * images.length)];

    const imageUrl = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${random.name}`;

    res.status(200).json({
      image: imageUrl
    });

  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
}
