import { axiosClient } from "@/shared/api/axios";
import { CoinType } from "@/entities/coin/coin";

class CoinService {
  async getPopularCoins() {
    try {
      const res = await axiosClient.get<CoinType>(
        `/crypto/current-prices?filter=popular`,
      );

      return res.data;
    } catch {
      throw Error("Can't fetch coins");
    }
  }

  async getCoins(
    page: number = 0,
    size: number = 10,
    filter: string = "popular",
  ) {
    try {
      const res = await axiosClient.get<CoinType>(
        `/crypto/current-prices?page=${page.toString()}&size=${size.toString()}&filter=${filter}`,
      );

      return res.data;
    } catch {
      throw Error("Can't fetch coins");
    }
  }
}

export const coinService = new CoinService();
