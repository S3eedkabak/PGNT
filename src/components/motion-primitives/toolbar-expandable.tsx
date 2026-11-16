// Adapted from Motion Primitives' ToolbarExpandable (MIT).
// Keeps its measured-height expansion and spring transition; replaces demo items with course search.
import { useEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { TextMorph } from "./text-morph";
import useClickOutside from "@/hooks/useClickOutside";
export default function ToolbarExpandable({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [ref, { height }] = useMeasure();
  const container = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  useClickOutside(container, () => setOpen(false));
  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);
  return (
    <div
      className="search-toolbar"
      ref={container}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          container.current?.querySelector("button")?.focus();
        }
      }}
    >
      <button
        className="search-toggle"
        aria-label={open ? "Close search" : "Search courses"}
        aria-expanded={open}
        aria-controls="quick-search"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={18} /> : <Search size={18} />}
        <TextMorph as="span">{open ? "Close" : "Search"}</TextMorph>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="quick-search"
            className="search-expansion"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: height || "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.25 }}
          >
            <form
              ref={ref}
              onSubmit={(e) => {
                e.preventDefault();
                onSearch(input.current?.value || "");
                setOpen(false);
              }}
            >
              <label htmlFor="quick-query">What would you like to learn?</label>
              <div className="search-field">
                <Search size={20} />
                <input
                  id="quick-query"
                  ref={input}
                  placeholder="Try WPR, NEBOSH, first aid…"
                />
                <button className="btn primary" type="submit">
                  <TextMorph as="span">Find courses</TextMorph>
                </button>
              </div>
              <p>Search by course name, skill, or training area.</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
