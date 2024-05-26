import fs from "fs";
const componentName = `gradual-spacing`;

// import WordsGradualSpacing from "./gradual-spacing";

export default async function CodeBlock() {
  const fileName = `${componentName}.tsx`;
  const _code = fs.readFileSync(`./components/${fileName}`, "utf-8");
  const codeToShow = _code.split("// COMPONENT_END")[0]!;

  // BTW, not specifying the extension also works...
  const WordsGradualSpacing = await import(`@/components/${fileName}`).then(
    (mod) => mod.default
  );

  return (
    <>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        See it in action
      </h4>
      <WordsGradualSpacing />

      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Use this code
      </h4>

      <div className="whitespace-pre-wrap bg-slate-700 p-3.5 pb-3 text-sm rounded-t-lg border flex justify-between items-center border-slate-600 border-b-0 font-mono">
        components/gradual-spacing.tsx
        <div className="flex items-center gap-2">
          <button>copy</button>
          <button>download</button>
        </div>
      </div>
      <div className="whitespace-pre-wrap bg-slate-800 p-3.5 pt-3 rounded-b-lg border border-slate-600 font-mono">
        {codeToShow}
      </div>
    </>
  );
}
