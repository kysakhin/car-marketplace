import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Profile() {
  return (
    <div>
      <div>
        <div className="text-center py-6 flex justify-around items-center">
          <h2 className="font-bold md:text-5xl text-3xl">Your listings</h2>
          <Link href="/add-listing"><Button>Add new listing</Button></Link>
        </div>
      </div>
    </div>
  )
}
