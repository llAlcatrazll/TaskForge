export default function Anime_Details({ details }: { details: any }) {
  let title: string = "text-sm font-bold";
  let variable: string = "text-xs px-1";
  let container: string = "mb-3";
  return (
    <div className=" w-full  p-3 flex ">
      <div className="w-[25%] flex flex-col">
        <span className={container}>
          <p className={title}>Format</p>
          <p className={variable}>{details.episodes}</p>
        </span>{" "}
        <span className={container}>
          <p className={title}>Episodes</p>
          <p className={variable}>{details.episodes}</p>
        </span>
        <span className={container}>
          <p className={title}>Episode Duration</p>
          <p className={variable}>{details.episodes}</p>
        </span>
        <span className={container}>
          <p className={title}>Status</p>
          <p className={variable}>{details.episodes}</p>
        </span>
        <span className={container}>
          <p className={title}>Start Date</p>
          <p className={variable}>{details.episodes}</p>
        </span>
        <span className={container}>
          <p className={title}>Season</p>
          <p className={variable}>{details.episodes}</p>
        </span>
      </div>
      <div className="w-[25%] flex flex-col">2</div>
      <div className=" bg-red-400">3</div>
      {/* <span className={container}>
        <p className={title}>Episodes</p>
        <p className={variable}>{details.episodes}</p>
      </span> */}
    </div>
  );
}
/*
   <p>{details.format || "missing"}</p>
      <p>{details.episodes || "missing"}</p>
      <p>{details.duration || "missing"}</p>
      <p>{details.status || "missing"}</p> */
/*
     format
    episodes
    duration
    # episode duration
    status
    startDate {
      month
      day
      year
    }
    season
    averageScore
    meanScore
    popularity
    favourites
    studios {
      nodes {
        name
      }
    }
    source
    genres

*/
