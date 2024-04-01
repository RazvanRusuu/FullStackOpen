import { useEffect, useState } from "react";
import axios from "axios";
import { IDiary } from "../types";
import Diaries from "./components/Diaries";
import AddDiary from "./components/AddDiary";

const BASE_URL = "http://localhost:3000/api";

function App() {
  const [diaries, setDiaries] = useState<IDiary[]>([]);

  useEffect(() => {
    const getDiaries = async () => {
      const response = await axios.get<IDiary[]>(`${BASE_URL}/diaries`);
      setDiaries(response.data as IDiary[]);
    };

    getDiaries();
  }, []);

  return (
    <div>
      <AddDiary />
      <Diaries diaries={diaries} />
    </div>
  );
}

export default App;
