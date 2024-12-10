export default function prettyId(id: string) {
  if (!id) return;
  const parts = id.split('-');
  return parts[parts.length - 1];
}
