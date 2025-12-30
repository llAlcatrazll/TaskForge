import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
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
    bannerImage: string; // Add this field to match the backend response
  }[];
  type?: "trending" | "random";
  activePage: string;
  setActivePage: (page: string) => void;
  setSelectedAnimeId: (id: number) => void;
};

export default function Anime_Featured({
  anime,
  setActivePage,
  setSelectedAnimeId,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return; // early exit if undefined

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    emblaApi.on("select", onSelect);
    onSelect(); // initialize selectedIndex

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const currentAnime = anime[selectedIndex];

  return (
    <div className="h-full overflow-hidden">
      <div ref={emblaRef} className="overflow-hidden relative">
        {/* Track */}
        <div className="flex">
          {anime.map((item) => (
            <div
              key={item.id}
              className="embla__slide flex-[0_0_100%] h-[650px]"
              onClick={() => {
                setSelectedAnimeId(item.id);
                setActivePage("animewatchlist:aboutpage");
              }}
            >
              <img
                src={item.bannerImage}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Overlay info: show only for current slide */}
        {currentAnime && (
          <div className="absolute top-0 w-[30%] left-0 h-full z-20 items-center justify-center text-center flex flex-col bg-[--dark-D-blue]">
            <p className="text-7xl">{selectedIndex + 1}</p>
            <p>{currentAnime.title.english ?? currentAnime.title.romaji}</p>
            <div className="flex gap-10 mt-4">
              <p onClick={() => emblaApi?.scrollPrev()}>left</p>
              <p onClick={() => emblaApi?.scrollNext()}>right</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
{
  /* <div className="shrink-0 ml-2 flex flex-col gap-2">
  <button onClick={() => emblaApi?.scrollPrev()}>◀</button>
  <button onClick={() => emblaApi?.scrollNext()}>▶</button>
</div> */
}
