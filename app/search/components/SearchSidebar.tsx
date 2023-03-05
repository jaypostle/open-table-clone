import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";
export default function SearchSidebar({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) {
  // console.log(locations);

  // console.log(cuisines);

  // add different query parameters to our page url by clicking
  // &cuisine=mexican
  // preserve existing query params

  const prices = [
    {
      price: PRICE.CHEAP,
      label: "$",
      className: "rounded-l",
    },
    {
      price: PRICE.REGULAR,
      label: "$$",
      className: "",
    },
    {
      price: PRICE.EXPENSIVE,
      label: "$$$",
      className: "rounded-r",
    },
  ];

  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {locations &&
          locations.map((city) => (
            <Link
              className="font-light text-reg capitalize"
              key={city.id}
              href={{
                pathname: "/search",
                query: { ...searchParams, city: city.name },
              }}
            >
              {city.name}
            </Link>
          ))}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col ">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines &&
          cuisines.map((cuisine) => (
            <Link
              className="font-light text-reg capitalize"
              key={cuisine.id}
              href={{
                pathname: "/search",
                query: { ...searchParams, cuisine: cuisine.name },
              }}
            >
              {cuisine.name}
            </Link>
          ))}
      </div>
      <div className="mt-3 pb-4 ">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map((price) => (
            <Link
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  price: price.price,
                },
              }}
              className={`flex justify-center border w-full text-reg font-light p-2 ${price.className}`}
            >
              {price.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
