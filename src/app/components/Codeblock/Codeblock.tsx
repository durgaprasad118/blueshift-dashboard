"use client";

import { useRef, useState } from "react";
import Icon from "../Icon/Icon";
import { motion } from "motion/react";
import classNames from "classnames";
import { anticipate } from "motion";

export function Codeblock({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  const preRef = useRef<HTMLPreElement>(null);
  const inlineRef = useRef<HTMLElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleClickCopy = async () => {
    const code = inlineRef.current?.textContent || preRef.current?.textContent;
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };


  const codeText = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";
  const isSingleLine = codeText.trim().split("\n").length === 1;

  return (
    <div className="relative w-full border border-border rounded-xl overflow-hidden !my-8 bg-background-card">
      {isSingleLine ? (
        <div className="flex items-center min-h-[40px] px-4 py-1 bg-background-card relative">
          <code ref={inlineRef} className="flex-1 text-brand-secondary whitespace-pre text-base">{children}</code>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: anticipate }}
            key={isCopied ? "success" : "copy"}
            onClick={() => {
              if (isCopied) return;
              handleClickCopy();
            }}
            className={classNames(
              "ml-2 p-1 bg-background-card-foreground rounded-md cursor-pointer transition",
              {
                "!text-brand-primary !cursor-default": isCopied,
                "hover:bg-background-primary": !isCopied,
              }
            )}
            title={isCopied ? "Copied!" : "Copy to clipboard"}
            style={{ boxShadow: "0 1px 4px 0 rgba(0,0,0,0.04)" }}
          >
            <Icon
              name={isCopied ? "Success" : "Copy"}
              size={16 as 18 | 14 | 12}
              className={classNames(
                "text-mute transition",
                {
                  "!text-brand-primary !cursor-default": isCopied,
                }
              )}
            />
          </motion.div>
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: anticipate }}
            key={isCopied ? "success" : "copy"}
            onClick={() => {
              if (isCopied) return;
              handleClickCopy();
            }}
            className={classNames(
              "absolute top-3 right-3 z-10 p-1 bg-background-card-foreground rounded-md cursor-pointer transition",
              {
                "!text-brand-primary !cursor-default": isCopied,
                "hover:bg-background-primary": !isCopied,
              }
            )}
            title={isCopied ? "Copied!" : "Copy to clipboard"}
            style={{ boxShadow: "0 1px 4px 0 rgba(0,0,0,0.04)" }}
          >
            <Icon
              name={isCopied ? "Success" : "Copy"}
              size={16 as 18 | 14 | 12}
              className={classNames(
                "text-mute transition",
                {
                  "!text-brand-primary !cursor-default": isCopied,
                }
              )}
            />
          </motion.div>
          <pre className="py-2 px-4 overflow-x-auto bg-transparent m-0" style={{ lineHeight: '1.4' }} ref={preRef}>
            <code className="block whitespace-pre m-0 p-0" style={{ lineHeight: '1.4' }}>{children}</code>
          </pre>
          {lang && (
            <span className="absolute bottom-2 right-3 text-xs text-brand-secondary opacity-60 select-none pointer-events-none">
              {lang}
            </span>
          )}
        </>
      )}
    </div>
  );
}

export default Codeblock;
