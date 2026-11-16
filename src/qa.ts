// Opt-in development-only accessibility audit. Never loaded by production builds.
import axe from "axe-core";
async function audit() {
  const result = await axe.run(document, {
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
  });
  console.info(
    "PNGIT_ACCESSIBILITY_AUDIT",
    JSON.stringify({
      violations: result.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
      passes: result.passes.length,
    }),
  );
}
setTimeout(audit, 1500);
// Audit the current panel after it has opened: Alt+Shift+A.
window.addEventListener("keydown", (event) => {
  if (event.altKey && event.shiftKey && event.code === "KeyA") {
    event.preventDefault();
    void audit();
  }
});
