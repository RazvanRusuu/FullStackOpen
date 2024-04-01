import { IDiary } from "../../types";

const Diary = ({ diary }: { diary: IDiary }) => {
  return (
    <div>
      <h3>{diary.date}</h3>
      <p>visibility: {diary.visibility}</p>
      <p>wether: {diary.weather}</p>
    </div>
  );
};

export default Diary;
