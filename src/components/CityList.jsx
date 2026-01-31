import styles from "./CityList.module.css";
// import styles from "./CountryList.module.css"
import Spinner from "./Spinner"
import CityItem from "./CityItem";
import Message from "./Message";
// import { useCities } from "../contexts/CitiesContexts";
import { useCities } from "../hooks/CitiesContexts";
function CityList() {

  const {isLoading , cities } = useCities();
  
  if(!cities.length) return <Message message="Add Your first city by clicking on a city on the map"/>
  return (
    <ul className={styles.cityList}>
     {isLoading ? <Spinner/> :cities.map(city=>(
      <CityItem city={city} key = {city._id}/>
     ))}
    </ul>
  )
}

export default CityList
