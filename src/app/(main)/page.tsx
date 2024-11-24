import { Container } from "@/shared/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { PopularList } from "@/widget/home/PopularList";

export default function Home() {
  return (
    <>
      <Container>
        <div className="bg-dark-blue rounded-3xl py-16 px-14 flex gap-24">
          <Image
            src={"/assets/img/banner_thing.png"}
            alt={"Banner Thing"}
            width={256}
            height={256}
          />
          <h1 className="text-white font-kronaOne text-4xl mt-8">SMARTMoney</h1>
        </div>
        <div className="flex items-center justify-between px-6 py-6">
          <h2 className="text-xl font-semibold">Popular Coins</h2>
          <Link href={"/list"} className="underline">
            See all
          </Link>
        </div>
        <PopularList />
      </Container>
    </>
  );
}
