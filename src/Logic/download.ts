

export default function DownloadAsFile(fileType: string, fileName: string, fileContents: string) {
  if (fileContents.length === 0) return
  const blob = new Blob([fileContents], { type: fileType });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.${fileType}`;
  document.body.appendChild(a)
  a.click()
  a.remove()
  window.URL.revokeObjectURL(url);
}
