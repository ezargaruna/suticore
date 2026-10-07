export async function loadDocument(path: string) {

  const response = await fetch("/" + path + ".md");

  if (!response.ok) {
    throw new Error("Document not found");
  }

  return await response.text();

}
