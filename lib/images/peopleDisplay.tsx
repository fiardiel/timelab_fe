type ImageRecord = {
  image_url: string;
  people: Record<string, string>; // 👈 now it's a dictionary
};

export default function PeopleDisplay({ record }: { record: ImageRecord }) {
  const names = Object.keys(record.people).filter(
    (key) => record.people[key] === "true"
  );

  return (
    <div>
      People: {names.join(", ")}
    </div>
  );
}
