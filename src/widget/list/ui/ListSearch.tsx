import { Search } from "lucide-react";

export const ListSearch = () => {
  return (
    <div className="flex items-center gap-3 w-full border border-dark-blue rounded-full py-3 px-6">
      <Search className="text-neutral-400" />
      <input
        className="w-full outline-none text-xl font-medium"
        placeholder="Search"
      />
    </div>
  );
};
