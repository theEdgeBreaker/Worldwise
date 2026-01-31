import styles from "./CountryList.module.css";
import Spinner from "./Spinner"
import CountryItem from "./CountryItem";
import Message from "./Message";
// import { useCities } from "../contexts/CitiesContexts";

import { useCities } from "../hooks/CitiesContexts";
function CountryList() {
    // const countries = [];
    // const temp = [];
    // for (let i = 0; i < cities.length; i++) {
    //     const city = cities[i];
    //     if (countries.length === 0) {
    //         countries.push({ country: city.country, emoji: city.emoji })
    //         temp.push(city.country);
    //     }
    //     else {
    //         if (!temp.find(c => c === city.country)) {
    //             countries.push({ country: city.country, emoji: city.emoji });
    //             temp.push(city.country)
    //         }
    //     }
    // }

    const {isLoading , cities} = useCities();
    const countries = cities.reduce((arr, city) => {
        if (!arr.map(el => el.country).includes(city.country)) return [...arr, { country: city.country, emoji: city.emoji }];
        else return arr;
    }, [])

    if (!cities.length) return <Message message="Add Your first city by clicking on a city on the map" />
    return (
        <ul className={styles.countryList}>
            {isLoading ? <Spinner /> : countries.map(country => (
                <CountryItem country={country} key={country.country} />
            ))}
        </ul>
    )
}

export default CountryList
