// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import DatePicker from "react-datepicker";
import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef, useEffect, useState } from "react";

import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
// import { useCities } from "../contexts/CitiesContexts";
import { useCities } from "../hooks/CitiesContexts";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}


function Form() {
  const [cityName, setCityName] = useState(null);
  const [country, setCountry] = useState("");
  const [date1, setDate1] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("")

  const [lat, lng] = useUrlPosition();
  const { createCity , isLoading } = useCities();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const navigate = useNavigate("")

  useEffect(function () {
    // if(!lat || !lng ) return;
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true)
        setGeoCodingError("");
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode) throw new Error("This doesn't seems to be a city. Please click somewhere else");

        if (data.city) setCityName(data.city);
        else { setCityName(data.locality) }
        setCountry(data.countryName)
        const countryFlag = convertToEmoji(data.countryCode)
        setEmoji(countryFlag)
      } catch (error) {
        setGeoCodingError(error.message);
      }
      finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date1) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date: date1,
      notes,
      position: { lat, lng }
    }
    // console.log(newCity);
    await createCity(newCity);
    navigate("/app/cities")

  }

  if (geoCodingError) return <Message message={geoCodingError} />
  return (
    <form className={`${styles.form} ${isLoading ? styles.loading :""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker onChange={date => setDate1(date)} selected={date1} dateFormat="dd/MM/yyyy" customInput={<EmojiInput />} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

const EmojiInput = forwardRef(({ value = date1 || "", onClick, ...props }, ref) => {

  return <div className={styles["emoji-input"]} >
    <input value={value == null ? "" : value} ref={ref} readOnly onClick={onClick} {...props} />
    <span className={styles.emoji}>📅</span>
  </div>
});




export default Form;
