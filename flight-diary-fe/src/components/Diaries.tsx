import { IDiary } from "../../types";
import Diary from "./Diary";

const Diaries = ({ diaries }: { diaries: IDiary[] }) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((d) => (
        <Diary key={d.id} diary={d} />
      ))}
    </div>
  );
};

export default Diaries;
