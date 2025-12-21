// TODO: Make this customizable by user
const DIARY_UNLOCK_HOUR = 21;

function isDiaryUnlocked(): boolean {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return hours > DIARY_UNLOCK_HOUR || (hours === DIARY_UNLOCK_HOUR && minutes >= 0);
}

export default function DiaryCTA({ onAddEntry }: { onAddEntry?: () => void }) {
  const unlocked = isDiaryUnlocked();

  return (
    <section className="w-full max-w-xl mx-auto flex flex-col items-start px-6">
      {!unlocked ? (
        <div className="bg-sereniteCard/20 border-l-4 border-sereniteText p-4 rounded shadow text-sereniteTextLight w-full">
          <span>
            Your diary unlocks at <strong>{DIARY_UNLOCK_HOUR}:00</strong> local time.
            Please come back tonight and celebrate your happy moments!
          </span>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-3 items-start">
          <span className="text-lg text-sereniteText font-medium">
            It’s time to <span className="text-sereniteAccent">reflect!</span> Ready to log today’s happy <span className="underline decoration-sereniteAccent underline-offset-2">moments?</span>
          </span>
          <button
            className="bg-sereniteCard text-white font-semibold px-4 py-2 rounded shadow hover:bg-sereniteCard/90 transition"
            onClick={onAddEntry}
          >
            Add Today’s Entry
          </button>
        </div>
      )}
    </section>
  );
}
