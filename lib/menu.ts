export const menuWeek = "Week of 9 March";
export const menuPrice = "$185 per person";

export type Course = { name: string; how: string };

export const courses: Course[] = [
  {
    name: "Bread, marrow",
    how: "Sourdough baked directly on the hearthstones. Beef marrow roasted in the bone, burnt lemon, salt.",
  },
  {
    name: "Oysters, ember cream",
    how: "Thirty seconds over the coals, no longer. Cream smoked in the same fire, chives cut over the top.",
  },
  {
    name: "Leeks, black butter",
    how: "Buried whole in the embers until they collapse. Peeled at the pass, butter cooked to brown-black, toasted hazelnut.",
  },
  {
    name: "Scallop, pork fat",
    how: "One large scallop grilled in the shell over hard heat. Cured pork fat melted across it, dried seaweed.",
  },
  {
    name: "Flatbread, mushrooms",
    how: "Cooked against the fire wall until it blisters. Mushrooms grilled dry, aged beef fat, thyme.",
  },
  {
    name: "Whole fish, fennel",
    how: "Whatever came in that morning, grilled on the bone over embers. Fennel charred then dressed raw, the fish's own juices.",
  },
  {
    name: "Short rib, three days",
    how: "Cooked low beside the fire for three days, then finished hard over the flame. Onions taken down to black, mustard.",
  },
  {
    name: "Milk, honeycomb",
    how: "The skin lifted off warm milk by the heat of the fire. Honeycomb warmed until it runs, toasted barley.",
  },
];

export const teaser: Course[] = courses.slice(2, 6);
