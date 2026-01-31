import React from 'react'
import styles from "./CityItem.module.css"
import { Link } from 'react-router-dom';
// import { useCities } from '../contexts/CitiesContexts';

import { useCities } from '../hooks/CitiesContexts';

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",

  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, position, _id } = city;

  async function handleClick(e) {
    e.preventDefault();
    
    await deleteCity(_id)
  }

  return (
    <li>
      <Link to={`${_id}?lat=${position.lat}&lng=${position.lng}`} className={`${styles.cityItem} ${currentCity._id === _id ? styles['cityItem--active'] : ""}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
      </Link>
    </li>
  )
}

export default CityItem