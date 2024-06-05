import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="w-25 mt-3">
        <ul className="list-group list-group-flush">
          <li className="list-group-item active">Menu</li>
          <li className="list-group-item">
            <Link href="/pages/cars">Cars</Link>
          </li>
          <li className="list-group-item" >
            <Link href="/pages/orders">Orders</Link>
          </li >
        </ul >
      </div >
    </main >
  );
}
