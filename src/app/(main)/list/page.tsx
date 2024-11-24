import { FilterButton } from "@/widget/list/ui/FilterButton";
import { ListSearch } from "@/widget/list/ui/ListSearch";
import { MyPagination } from "@/widget/Pagination";

const ListPage = () => {
  return (
    <div className="space-y-6">
      <ListSearch />
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">List of all coins</h2>
          <FilterButton />
        </div>
        <MyPagination />
      </div>
    </div>
  );
};

export default ListPage;
