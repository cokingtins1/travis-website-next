export async function POST(req, res) {
  const { files } = req;
  console.log(files);
  res.status(200).json({ message: 'File uploaded' });
}