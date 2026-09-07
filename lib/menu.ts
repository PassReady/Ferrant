export type Dish = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

export type MenuState = {
  week: string;
  priceNote: string;
  wine: string;
  dishes: Dish[];
};

/** Images bundled in /public/img that the admin can assign to a dish. */
export const imageLibrary: { src: string; label: string }[] = [
  { src: "/img/chef-grill.jpg", label: "Whole fish on the bars" },
  { src: "/img/meat-fire.jpg", label: "Meat over flame" },
  { src: "/img/charcoal-fire.jpg", label: "Grill and flame" },
  { src: "/img/firewood.jpg", label: "Glowing coals" },
  { src: "/img/grill-night.jpg", label: "Flare at the pass" },
  { src: "/img/oven-fire.jpg", label: "The fire wall" },
  { src: "/img/fire-person.jpg", label: "Pan of flame" },
  { src: "/img/dish-veg-fire.jpg", label: "Vegetables, charred" },
  { src: "/img/dish-plated.jpg", label: "Plated, dark" },
];

export const seedMenu: MenuState = {
  week: "Week of 9 March",
  priceNote: "$185 per person",
  wine: "Six glasses poured against the courses, built to sit next to smoke — some local, some not. An extra $95 a head, or a three-glass pour for $55.",
  dishes: [
    {
      id: "d1",
      name: "Bread, marrow",
      price: "",
      description:
        "Sourdough baked on the hearthstones. Marrow roasted in the bone, burnt lemon, salt.",
      image: "/img/oven-fire.jpg",
    },
    {
      id: "d2",
      name: "Oysters, ember cream",
      price: "",
      description:
        "Thirty seconds over the coals. Cream smoked in the same fire, chives.",
      image: "/img/charcoal-fire.jpg",
    },
    {
      id: "d3",
      name: "Leeks, black butter",
      price: "",
      description:
        "Buried whole in the embers until they collapse. Butter cooked to brown-black, hazelnut.",
      image: "/img/firewood.jpg",
    },
    {
      id: "d4",
      name: "Scallop, pork fat",
      price: "",
      description:
        "Grilled in the shell over hard heat. Cured pork fat melted across it, dried seaweed.",
      image: "/img/grill-night.jpg",
    },
    {
      id: "d5",
      name: "Flatbread, mushrooms",
      price: "",
      description:
        "Cooked against the fire wall until it blisters. Mushrooms grilled dry, aged beef fat, thyme.",
      image: "/img/dish-veg-fire.jpg",
    },
    {
      id: "d6",
      name: "Whole fish, fennel",
      price: "",
      description:
        "Whatever came in that morning, grilled on the bone over embers. Fennel charred then dressed raw.",
      image: "/img/chef-grill.jpg",
    },
    {
      id: "d7",
      name: "Short rib, three days",
      price: "",
      description:
        "Cooked low beside the fire for three days, then finished hard over the flame. Onions taken to black, mustard.",
      image: "/img/meat-fire.jpg",
    },
    {
      id: "d8",
      name: "Milk, honeycomb",
      price: "",
      description:
        "The skin lifted off warm milk by the heat of the fire. Honeycomb warmed until it runs, toasted barley.",
      image: "/img/fire-person.jpg",
    },
  ],
};
