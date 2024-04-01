import { FormEvent, useState } from "react";
import { TNewDiary } from "../../types";
import axios, { AxiosError } from "axios";

const AddDiary = () => {
  const [errors, setErrors] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<TNewDiary>({
    date: "",
    visibility: "",
    weather: "",
    comment: "",
  });

  const handleChange = (value: string, name: keyof TNewDiary) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newDiary = await axios.post(
        "http://localhost:3000/api/diaries",
        formValues
      );
      console.log(newDiary);
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrors(error.response?.data);
      }
    }
  };

  return (
    <div>
      <h2>Add New Entry</h2>
      {errors && <span style={{ color: "red" }}>{errors}</span>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            value={formValues.date}
            onChange={({ target }) => handleChange(target.value, "date")}
            id="date"
          />
          {/* {errors?.date && <span>{errors.date}</span>} */}
        </div>
        <div>
          <label>Visibility</label>
          <label htmlFor="great">Great</label>
          <input
            type="radio"
            id="great"
            name="visibility"
            value="great"
            onChange={({ target }) => handleChange(target.value, "visibility")}
          />
          <label htmlFor="good">Good</label>
          <input
            type="radio"
            id="good"
            name="visibility"
            value="good"
            onChange={({ target }) => handleChange(target.value, "visibility")}
          />
          <label htmlFor="ok">Ok</label>
          <input
            type="radio"
            id="ok"
            name="visibility"
            value="ok"
            onChange={({ target }) => handleChange(target.value, "visibility")}
          />
          <label htmlFor="poor">Poor</label>
          <input
            type="radio"
            id="poor"
            name="visibility"
            value="poor"
            onChange={({ target }) => handleChange(target.value, "visibility")}
          />
          {/* {errors?.visibility && <span>{errors.visibility}</span>} */}
        </div>
        <div>
          <label>Weather</label>
          <label htmlFor="sunny">Sunny</label>
          <input
            type="radio"
            id="sunny"
            name="weather"
            value="sunny"
            onChange={({ target }) => handleChange(target.value, "weather")}
          />
          <label htmlFor="rainy">Rainy</label>
          <input
            type="radio"
            id="rainy"
            name="weather"
            value="rainy"
            onChange={({ target }) => handleChange(target.value, "weather")}
          />
          <label htmlFor="cloudy">Cloudy</label>
          <input
            type="radio"
            id="cloudy"
            name="weather"
            value="cloudy"
            onChange={({ target }) => handleChange(target.value, "weather")}
          />
          <label htmlFor="stormy">Stormy</label>
          <input
            type="radio"
            id="stormy"
            name="weather"
            value="stormy"
            onChange={({ target }) => handleChange(target.value, "weather")}
          />
          <label htmlFor="windy">Windy</label>
          <input
            type="radio"
            id="windy"
            name="weather"
            value="windy"
            onChange={({ target }) => handleChange(target.value, "weather")}
          />
          {/* {errors?.visibility && <span>{errors.visibility}</span>} */}
        </div>
        <div>
          <label htmlFor="comment">comment</label>
          <input
            type="text"
            id="comment"
            value={formValues.comment}
            onChange={({ target }) => handleChange(target.value, "comment")}
          />
          {/* {errors?.comment && <span>{errors.comment}</span>} */}
        </div>
        <button>Add</button>
      </form>
    </div>
  );
};

export default AddDiary;
