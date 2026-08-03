/**
 * There is no real file storage behind this app yet, so downloads are
 * simulated: we generate a small Blob describing the situation and trigger
 * a real browser download with it, named after the original file.
 */
export function downloadMockFile(fileName: string) {
  const isXml = fileName.toLowerCase().endsWith(".xml");

  const content = isXml
    ? `<?xml version="1.0" encoding="UTF-8"?>\n<documentoSimulado>\n  <arquivo>${fileName}</arquivo>\n  <observacao>Conteudo gerado pelo Aduana Hub para demonstracao. Nao ha dado fiscal real aqui.</observacao>\n</documentoSimulado>\n`
    : `Arquivo de demonstração: ${fileName}\n\nEste conteúdo foi gerado pelo Aduana Hub para simular o download deste documento. Nenhum dado fiscal real está presente.\n`;

  const blob = new Blob([content], {
    type: isXml ? "application/xml" : "text/plain",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
