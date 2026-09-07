import { catId, type Category, type CategoryImage, type Dish } from "@/lib/menu";
import { MenuDishes } from "@/components/MenuDishes";
import { MenuCategoryImage } from "@/components/MenuCategoryImage";

/**
 * Mobile/tablet layout: one category's heading, dishes, and photo, in
 * reading order, repeated per category. Below 58rem, .menu3__board--split
 * (the desktop two-column version, in MenuBoard) is hidden and this is
 * what renders instead — see the comment on .menu3__board--split in
 * globals.css for why the two need to be separate structures rather than
 * one reflowed by CSS alone.
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
    <section id={`${catId(category)}-stack`} className="menu3__catrow">
      <h2 className="menu3__catheading">{category}</h2>
      <MenuDishes dishes={dishes} />
      <MenuCategoryImage images={images} />
    </section>
  );
}
