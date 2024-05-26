import fs from "fs";

export default async function CodeBlock() {
  const code = fs.readFileSync("./components/gradual-spacing.tsx", "utf-8");

  return <>{code}</>;
}
