export const CATEGORIES = [
  "Bites",
  "Entrées",
  "Mains",
  "Sides",
  "Desserts",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Dish = {
  id: string;
  category: Category;
  name: string;
  price: string;
  description: string;
};

export type MenuState = {
  intro: string;
  dishes: Dish[];
};

export type CategoryImage = { src: string; alt: string };

/** 3–4 categorically accurate photos per tab, stepped through with the carousel. */
export const categoryImages: Record<Category, CategoryImage[]> = {
  Bites: [
    { src: "/img/menu/bites-mussels.jpg", alt: "Oysters on ice, close up" },
    { src: "/img/menu/bites-sourdough2.jpg", alt: "Charred sourdough with cultured butter" },
    { src: "/img/menu/bites-marrow2.jpg", alt: "Roasted bone marrow, close up" },
    { src: "/img/menu/bites-flatbread2.jpg", alt: "Wood-fired flatbread, torn" },
  ],
  Entrées: [
    { src: "/img/menu/entree-scallop2.jpg", alt: "Scallop and sea urchin on the shell" },
    { src: "/img/menu/entree-fish2.jpg", alt: "Seared fish fillet with charred vegetables" },
    { src: "/img/menu/entree-dish2.jpg", alt: "Thinly sliced fish with radish and herbs" },
    { src: "/img/menu/entree-mushroom2.jpg", alt: "Mushroom toast with beetroot" },
  ],
  Mains: [
    { src: "/img/menu/main-fish2.jpg", alt: "Whole grilled fish with herbs on a plate" },
    { src: "/img/menu/main-shortrib2.jpg", alt: "Slow-cooked beef short rib with sauce" },
    { src: "/img/menu/main-lamb2.jpg", alt: "Pulled lamb shoulder with fresh herbs" },
    { src: "/img/menu/main-chicken2.jpg", alt: "Roasted chicken with potatoes" },
  ],
  Sides: [
    { src: "/img/menu/side-greens2.jpg", alt: "Charred broccoli in a bowl" },
    { src: "/img/menu/side-potatoes2.jpg", alt: "Baked potato split open with butter" },
    { src: "/img/menu/side-corn2.jpg", alt: "Grilled corn cobs with dipping sauces" },
  ],
  Desserts: [
    { src: "/img/menu/dessert-stonefruit2.jpg", alt: "Roasted stone fruit with ice cream and berries" },
    { src: "/img/menu/dessert-tart2.jpg", alt: "Chocolate tart with a ganache lattice" },
    { src: "/img/menu/dessert-custard2.jpg", alt: "Baked custard with caramel" },
  ],
};

export const seedMenu: MenuState = {
  intro:
    "Everything below comes off the one fire in the kitchen. The selection shifts with the season and the market — this is what's running this week.",
  dishes: [
    // — Bites —
    {
      id: "d1",
      category: "Bites",
      name: "Oysters, ember cream",
      price: "",
      description:
        "Natural, thirty seconds over the coals. Cream smoked in the same fire, chives.",
    },
    {
      id: "d2",
      category: "Bites",
      name: "Sourdough, burnt lemon butter",
      price: "",
      description:
        "Baked on the hearthstones, served warm. Butter cultured and finished with burnt lemon and sea salt.",
    },
    {
      id: "d3",
      category: "Bites",
      name: "Marrow, roasted in the bone",
      price: "",
      description:
        "Whole bones roasted directly in the embers, burnt lemon, herb salt, grilled sourdough to scrape it onto.",
    },
    {
      id: "d4",
      category: "Bites",
      name: "Charred flatbread, whipped tallow",
      price: "",
      description:
        "Blistered against the fire wall, torn at the table, tallow whipped with roasted garlic.",
    },
    // — Entrées —
    {
      id: "d5",
      category: "Entrées",
      name: "Scallop, pork fat, dried seaweed",
      price: "",
      description:
        "Grilled in the shell over hard heat, cured pork fat melted across it, dried seaweed.",
    },
    {
      id: "d6",
      category: "Entrées",
      name: "Leeks, black butter, hazelnut",
      price: "",
      description:
        "Buried whole in the embers until they collapse, butter cooked to brown-black, hazelnut.",
    },
    {
      id: "d7",
      category: "Entrées",
      name: "Kingfish, chilli, cumquat",
      price: "",
      description:
        "Lightly charred over coals, roasted chilli paste, cumquat, basil.",
    },
    {
      id: "d8",
      category: "Entrées",
      name: "Flatbread, mushrooms, aged beef fat",
      price: "",
      description:
        "Cooked against the fire wall until it blisters, mushrooms grilled dry, aged beef fat, thyme.",
    },
    // — Mains —
    {
      id: "d9",
      category: "Mains",
      name: "Whole fish, fennel",
      price: "",
      description:
        "Whatever came in that morning, grilled on the bone over embers, fennel charred then dressed raw.",
    },
    {
      id: "d10",
      category: "Mains",
      name: "Short rib, three days",
      price: "",
      description:
        "Slow over low coals for three days, finished hard against direct flame, jus reduced over the fire.",
    },
    {
      id: "d11",
      category: "Mains",
      name: "Lamb shoulder, wood-roasted",
      price: "",
      description:
        "Cooked whole over indirect heat for six hours, pulled at the table, chimichurri, pickled onion.",
    },
    {
      id: "d12",
      category: "Mains",
      name: "Whole chicken, spatchcocked",
      price: "",
      description:
        "Butterflied and grilled flat over open flame, garlic and herb butter basted throughout.",
    },
    // — Sides —
    {
      id: "d13",
      category: "Sides",
      name: "Charred greens, chilli oil",
      price: "",
      description: "Whatever's in season, quickly charred, finished with chilli oil and lemon.",
    },
    {
      id: "d14",
      category: "Sides",
      name: "Coals potatoes",
      price: "",
      description:
        "Cooked directly in the embers, split and dressed with cultured butter and herbs.",
    },
    {
      id: "d15",
      category: "Sides",
      name: "Grilled corn, smoked butter",
      price: "",
      description: "Charred over open flame, brushed with butter smoked in the same fire.",
    },
    // — Desserts —
    {
      id: "d16",
      category: "Desserts",
      name: "Fire-roasted stone fruit",
      price: "",
      description:
        "Whatever's ripest, roasted directly in the embers, mascarpone, honeycomb.",
    },
    {
      id: "d17",
      category: "Desserts",
      name: "Smoked chocolate tart",
      price: "",
      description: "Chocolate ganache smoked over the fire before setting, burnt-caramel crust.",
    },
    {
      id: "d18",
      category: "Desserts",
      name: "Ember-baked custard",
      price: "",
      description: "Set slowly beside the coals rather than in an oven, dusted with charred sugar.",
    },
  ],
};
