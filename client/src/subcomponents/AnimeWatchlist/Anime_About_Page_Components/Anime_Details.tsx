export default function Anime_Details({ details }: { details: any }) {
  let title: string = "text-sm font-bold capitalize";
  let variable: string = "text-xs px-1";
  let container: string = "mb-3";
  let col1 = ["format", "episodes", "status", "start date", "season"];
  let col2 = [
    "averageScore",
    "meanScore",
    "popularity",
    "favourites",
    "source",
    "genres",
  ];
  let col3 = ["studios", "producers", "source"];
  return (
    <div className=" w-full  p-3 flex ">
      <div className="w-[25%] flex flex-col">
        {col1.map((anime) => (
          <span className={container}>
            <p className={title}>{anime}</p>
            <p className={variable}>{`${details[anime]}` || "missing"}</p>
          </span>
        ))}
      </div>
      <div className="w-[25%] flex flex-col">
        {col2.map((anime) => (
          <span className={container}>
            <p className={title}>{anime}</p>
            <p className={variable}>{`${details[anime]}` || "missing"}</p>
          </span>
        ))}
      </div>

      <div className="w-[25%] flex flex-col">
        {col3.map((anime) => (
          <span className={container}>
            <p className={title}>{anime}</p>
            <p className={variable}>{`${details[anime]}` || "missing"}</p>
          </span>
        ))}
      </div>
      <div>{title}</div>
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
