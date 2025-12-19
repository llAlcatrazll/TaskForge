import useEmblaCarousel from "embla-carousel-react";

type Props = {
  anime: {
    id: number;
    title: {
      romaji: string;
      english: string;
    };
    coverImage: {
      large: string;
    };
  }[];
  type?: "trending" | "random";
  activePage: string;
  setActivePage: (page: string) => void;
};

export default function Anime_Top10({
  anime,
  type,
  activePage,
  setActivePage,
}: Props) {
  const emblaOptions = {
    align: "start",
    loop: false,
    dragFree: false,
    containScroll: "trimSnaps",
  } as const;

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

  return (
    <div className="h-full flex overflow-hidden">
      {/* Embla viewport */}
      <div ref={emblaRef} className="flex-1 overflow-hidden">
        {/* Track */}
        <div className="flex gap-5">
          {anime.map((item, index) => (
            <div
              key={item.id}
              className="basis-[200px] shrink-0 grow-0 flex flex-col"
              onClick={() => {
                console.log("Top10 Navigation ti animewatchlist");
                setActivePage("animewatchlist:aboutpage");
              }}
            >
              <img
                loading="lazy"
                decoding="async"
                src={item.coverImage.large}
                className="h-[260px] w-full object-cover "
              />
              <div className="px-2 py-1 font-bold text-lg line-clamp-1">
                <span
                  className={`mr-1 font-extrabold text-xl ${
                    index >= 3
                      ? "text-[--ranking-blue]"
                      : type === "random"
                      ? "text-[--ranking-blue]"
                      : "text-[--bright-Y-action]"
                  }`}
                >
                  0{index + 1}
                </span>
                {item.title.english ?? item.title.romaji}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="shrink-0 ml-2 flex flex-col gap-2">
        <button onClick={() => emblaApi?.scrollPrev()}>◀</button>
        <button onClick={() => emblaApi?.scrollNext()}>▶</button>
      </div>
    </div>
  );
}
