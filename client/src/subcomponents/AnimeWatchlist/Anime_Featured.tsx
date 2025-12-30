import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { FaCalendarDay } from "react-icons/fa6";
import { FaCircleLeft } from "react-icons/fa6";
import { FaCircleRight } from "react-icons/fa6";
import FallbackImage from "../../assets/fallback/fallback_image.jpg";
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
    format: string;
    duration: string;
    startDate: {
      day: string;
      month: string;
      year: string;
    };
    description: string;
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
                src={item.bannerImage ? item.bannerImage : FallbackImage}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Overlay info: show only for current slide */}
        {currentAnime && (
          <div
            className="absolute top-0 w-[60%] pr-64 left-0 h-full z-20  justify-center pl-10 flex flex-col"
            style={{
              background:
                "linear-gradient(90deg, rgba(14,18,25,0.9) 70%, rgba(14,18,25,0) 100%)",
            }}
          >
            <p
              className={`text-xl ${
                selectedIndex >= 3
                  ? "text-[--ranking-blue]"
                  : "text-[--bright-Y-action]"
              }`}
            >
              {selectedIndex + 1}# Spotlight
            </p>
            <p className="text-3xl font-bold">
              {currentAnime.title.english ?? currentAnime.title.romaji}
            </p>
            <div className="mt-3 flex gap-3">
              {" "}
              <div className="flex items-center">
                <FaCirclePlay className="mr-2 " color="var(--medium-gray)" />
                {currentAnime.format}
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2 " color="var(--medium-gray)" />
                {currentAnime.duration}
              </div>
              <div className="flex items-center gap-4">
                <FaCalendarDay className="mr-2 " color="var(--medium-gray)" />
                {currentAnime.startDate.month} - {currentAnime.startDate.day} -
                {currentAnime.startDate.year}
              </div>
            </div>

            <p className="text-lg  line-clamp-4 mt-2 ">
              {/* MAKE THIS SAFE THING */}
              <p
                className="text-lg line-clamp-4 mt-2"
                dangerouslySetInnerHTML={{
                  __html: currentAnime.description ?? "",
                }}
              />
            </p>
            <div className="flex gap-10  bottom-10 w-[80%]">
              {/* FIX THIS */}
              <p onClick={() => emblaApi?.scrollPrev()}>
                <FaCircleLeft size={30} />
              </p>
              <p onClick={() => emblaApi?.scrollNext()}>
                <FaCircleRight size={30} />
              </p>
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
