export default function Header({ name }: { name: string }) {
  const formatTitleFromSlug = (slug: string) => {
    const arrayOfStrings = slug.split("-");

    const firstCharUpper = arrayOfStrings.map((word, i) => {
      if (i === arrayOfStrings.length - 1) {
        // wrap last word (the city) in brackets
        return `(${word[0].toUpperCase()}${word.slice(1)})`; // didn't actually need to use toUppercase since the tailwind css capitalize below does the trick
      }
      return word[0].toUpperCase() + word.slice(1);
    });

    return firstCharUpper.join(" ");
  };

  formatTitleFromSlug(name);
  return (
    <div className="h-96 overflow-hidden">
      <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
        <h1 className="text-7xl text-white capitalize text-shadow text-center">
          {formatTitleFromSlug(name)}
        </h1>
      </div>
    </div>
  );
}
