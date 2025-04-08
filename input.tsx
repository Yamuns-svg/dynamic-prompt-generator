import { InputHTMLAttributes } from "react";
export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="border px-4 py-2 w-full rounded" {...props} />;
}