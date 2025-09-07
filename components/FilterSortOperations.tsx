import Filter from "./Filter";
import Sort from "./Sort";

export default function FilterSortOperations() {
  return (
    <div className="flex justify-between  max-w-7xl mx-auto mt-8 gap-4">
      <div className="flex gap-4">
        <Filter />
        <Filter />
        <Filter />
        <Filter />
        <Filter />
      </div>

      <div>
        <Sort />
      </div>
    </div>
  );
}
