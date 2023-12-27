export default async (req, res) => {
  console.log(req.body);
  return res.status(400).json({body: req.body});
}
