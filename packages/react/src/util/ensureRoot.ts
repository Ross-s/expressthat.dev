import {v4 as uuid} from 'uuid';


export function ensureRoot(): [HTMLElement, () => void] {
  const root = document.createElement("div");
  root.id = uuid();
  document.body.appendChild(root);
  const el = document.getElementById(root.id);
  if (!el) throw new Error("Root element not found");
  return [el, () => document.body.removeChild(root)];
}
