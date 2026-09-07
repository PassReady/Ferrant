import type { Dish } from "@/lib/menu";

/** A category's dishes, two-up. Shared by the mobile/tablet stacked row and
 * the desktop split list — same markup either way. */
export function MenuDishes({ dishes }: { dishes: Dish[] }) {
  return (
    <ol className="menu3__dishes">
      {dishes.map((d) => (
        <li key={d.id} className="menu3__row">
          <div className="menu3__rowhead">
            <h3>{d.name}</h3>
            {d.price ? <span className="menu3__price">{d.price}</span> : null}
          </div>
          <p>{d.description}</p>
        </li>
      ))}
    </ol>
  );
}
