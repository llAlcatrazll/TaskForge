import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
// import coverImage from "../../assets/cover_image/test.jpg";
// ?=true :=false
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
};

export default function Anime_Top10({ anime, type }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    // FALSE LOOP AS IT COULD BE MESSY
  });

  // CONTROL
  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <div className=" w-full h-full flex flex-row">
      {/* Carousel viewport */}
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex gap-5 h-full">
          {anime.map((item, index) => (
            <div
              key={item.id}
              className="
                flex-[0_0_200px]
                aspect-[9/16]
                rounded-lg
                flex
                items-center
                justify-center
                text-xl
                font-bold
                select-none
                flex-col
              "
            >
              {/* {item.id} */}
              <img
                src={item.coverImage.large}
                className="object-cover overflow-hidden min-h-[190px] h-full w-full"
              />
              <div className="px-2 py-1 font-bold text-lg w-full text-left line-clamp-1  ">
                {index >= 3 ? (
                  <span
                    className={`mr-1 font-extrabold text-xl text-[--ranking-blue] `}
                  >
                    0{index + 1}
                  </span>
                ) : (
                  <span
                    className={`mr-1 font-extrabold text-xl ${
                      type === "random"
                        ? "text-[--ranking-blue]"
                        : "text-[--bright-Y-action]"
                    }`}
                  >
                    0{index + 1}
                  </span>
                )}
                {item.title.english ?? item.title.romaji}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        {" "}
        <div
          className="
        
        right-2
        flex
        flex-col
        gap-2
        z-10
      "
        >
          <button
            onClick={scrollPrev}
            className="bg-black/70 text-white px-3 py-2 rounded hover:bg-black"
          >
            ◀
          </button>
          <button
            onClick={scrollNext}
            className="bg-black/70 text-white px-3 py-2 rounded hover:bg-black"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Navigation buttons */}
    </div>
  );
}
