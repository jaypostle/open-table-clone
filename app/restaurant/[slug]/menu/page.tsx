import Menu from "../components/Menu";
import RestaurantNavBar from "../components/RestaurantNavBar";

function RestaurantMenu() {
  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavBar />
      <Menu />
    </div>
  );
}

export default RestaurantMenu;
