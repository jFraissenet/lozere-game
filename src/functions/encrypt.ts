export function encryptCode(code: string) {
  let encoded = "";
  for (let i = 0; i < code.length; i++) {
    encoded += code.charCodeAt(i);
  }
  return encoded;
}
