import { FilterButton } from "@/widget/list/ui/FilterButton";
import { ListSearch } from "@/widget/list/ui/ListSearch";
import { MyPagination } from "@/widget/Pagination";
import { CoinsList } from "@/widget/list/CoinsList";
import { Card, CardFooter, CardHeader } from "@/shared/ui/shadcn/card";

const ListPage = () => {
  return (
    <div className="space-y-6">
      <ListSearch />
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">List of all coins</h2>
          <FilterButton />
        </div>
        <Card className="border shadow">
          <CardHeader>
            <CoinsList />
          </CardHeader>
          <CardFooter>
            <MyPagination />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ListPage;
