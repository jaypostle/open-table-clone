import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSidebar from "./components/SearchSidebar";
import { PrismaClient, Cuisine, Location, PRICE } from "@prisma/client";

const prisma = new PrismaClient();

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
}

const fetchRestaurantsByCity = (
  city?: string
  // cuisine?: string,
  // price?: PRICE
) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
  };

  if (!city) return prisma.restaurant.findMany({ select });
  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city.toLowerCase() || undefined,
        },
      },
    },
    select,
  });
};

const fetchLocations = async () => {
  const locations = await prisma.location.findMany();
  return locations;
};

const fetchCuisines = async () => {
  const cuisines = await prisma.cuisine.findMany();
  return cuisines;
};

async function Search({
  searchParams,
}: {
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) {
  // extract query params
  // console.log(searchParams.city);

  // fetch for all restaurants with location = city
  const restaurants = await fetchRestaurantsByCity(searchParams.city);

  // ask only for data you need
  // if there is no data show a no restaurants found message

  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <Header />

      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSidebar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.length > 1 ? (
            restaurants.map((restaurant) => (
              <RestaurantCard restaurant={restaurant} key={restaurant.id} />
            ))
          ) : (
            <p>Sorry, we found no restaurants in this area.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
