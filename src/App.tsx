import { useEffect, useState } from "react";
import { PokeAPI } from "./pokeapiClient";

interface Pokemon {
  id: number;
  image: string;
  name: string;
  types: string[];
}

async function fetchData(): Promise<string[]> {
  const data = await PokeAPI.getPokemonFormsList();
  return data.results.map(item => item.name);
}

const typeColors: { [key : string]: string } = {
  Fire: "bg-red-400",
  Poison: "bg-purple-400",
  Grass: "bg-green-400",
  Water: "bg-blue-400"
};
function getTypeColor(type: string) {
  const color = typeColors[type];
  return color;
}

const Card = (props: Pokemon) => {
  return(
    <div className="bg-white w-3xs rounded-2x1">
      {props.id} - {props.name}
      <img src={props.image}/>
      <div className="justify-end flex flex-wrap gap-4 p-4">
        {props.types.map((props) => {
        return <div className={`p-4 ${getTypeColor(props)}`}>{props}</div>;
        })}
      </div>
    </div>
  )
}
export const App = () => {
  const [data, setData] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchData().then((result) => {
      setData(
        result.map((item) => ({
          id: 1,
          name: item,
          image: item,
          types: [item],
        }))
      );
    });
  }, []);

  return <div>
    <div  className="flex flex-wrap gap-4 p-4">
      {data.map((item) => {
        return <Card 
        id={item.id} 
        name={item.name} 
        image={item.image} 
        types={item.types}
        />;
      })}
    </div>
  </div>
}

export const Detail = () => {
  return null;
}
