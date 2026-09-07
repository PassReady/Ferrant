import { catId, type Category, type CategoryImage, type Dish } from "@/lib/menu";
import { MenuDishes } from "@/components/MenuDishes";
import { MenuCategoryImage } from "@/components/MenuCategoryImage";

/**
 * One category: heading, its dishes, and its own photo, paired in a single
 * row (image flush with the heading's rule, stretched to match the dish
 * column's height — see the desktop override in globals.css). Each photo
 * stays tied to its own section rather than running as an independent
 * strip, so a category with a short dish list still reads as "this photo
 * belongs to this text" — the dish spacing is generous enough that even
 * the shortest categories fill a reasonable amount of the image's height.
 */
export function MenuCategoryRow({
  category,
  dishes,
  images,
}: {
  category: Category;
  dishes: Dish[];
  images: CategoryImage[];
}) {
  return (
    <section id={catId(category)} className="menu3__catrow">
      <h2 className="menu3__catheading">{category}</h2>
      <MenuDishes dishes={dishes} />
      <MenuCategoryImage images={images} />
    </section>
  );
}
