// TypeScript type for an entry (adapt to your backend response as needed)
export type Entry = {
  id: number;
  entry_date: string;
  thing_1: string;
  why_1: string;
  thing_2: string;
  why_2: string;
  thing_3: string;
  why_3: string;
};

export default function EntryDayCard({ entry }: { entry: Entry }) {
  return (
    <div className="
      bg-sereniteCard/70 shadow-xl rounded-2xl p-5 flex flex-col items-center
      min-h-[260px] max-w-full w-full
      border-l-4 border-sereniteAccent
      transition
      ">
      <div className="font-bold text-sereniteTextLight text-xl mb-5 text-center w-full truncate">
        {entry.entry_date}
      </div>
      <div className="w-full flex flex-col gap-4">
        {[1, 2, 3].map(n => (
          <div
            key={n}
            className="flex flex-col bg-sereniteCard/90 p-4 rounded-lg shadow-md w-full min-h-[54px] justify-center"
          >
            <div
              className="font-semibold text-sereniteText mb-1 break-words"
              title={entry[`thing_${n}` as keyof Entry] as string}
            >
              {entry[`thing_${n}` as keyof Entry]}
            </div>
            <div
              className="text-sereniteTextLight text-sm italic whitespace-pre-line break-words"
              title={entry[`thing_${n}` as keyof Entry] as string}
            >
              {entry[`why_${n}` as keyof Entry]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
