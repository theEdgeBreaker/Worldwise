
import { useSearchParams } from "react-router-dom";


export function useUrlPosition(){
  //  const [mapPosition, setMapPosition] = useState([40, 0]);
     const [seacrchParams] = useSearchParams();
     const lat = seacrchParams.get('lat');
     const lng = seacrchParams.get('lng');
   
     return [lat , lng];
}