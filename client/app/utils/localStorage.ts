export function setGeneratedCode(code: string) {
  localStorage.setItem("GENERATED_CODE", code);
}

export function getGeneratedCode() {
  return localStorage.getItem("GENERATED_CODE");
}

export function clearGeneratedCode() {
  localStorage.removeItem("GENERATED_CODE");
}
