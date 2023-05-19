export async function convertBlobToImage(blob: Blob) {
  const arrayBuffer = await blob.arrayBuffer();
  const base64Image = Buffer.from(arrayBuffer).toString("base64");
  return "data:image/png;base64," + base64Image;
}
