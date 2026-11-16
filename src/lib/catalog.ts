export type SearchableCourse = {
  title: string;
  category: string;
  duration: string;
};
const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
export function matchesSearch(course: SearchableCourse, query: string) {
  const aliases = [
    /work permit receiver/i.test(course.title) ? "WPR" : "",
    /work permit issuer/i.test(course.title) ? "WPI" : "",
    /hydrogen sulfide/i.test(course.title) ? "H2S" : "",
  ];
  return normalize(
    [course.title, course.category, ...aliases].join(" "),
  ).includes(normalize(query));
}
export function matchesDuration(duration: string, filter: string) {
  if (filter === "All durations") return true;
  const days = duration.match(/^(\d+) Days?$/);
  if (filter === "1 day or less")
    return (
      !!(days && Number(days[1]) <= 1) || /^\d+(?:-\d+)? Hours?$/.test(duration)
    );
  return !!(days && Number(days[1]) >= 2);
}
