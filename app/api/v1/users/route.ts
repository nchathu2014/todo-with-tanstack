import { NextRequest, NextResponse } from "next/server";

export const users = [
  { id: "1", name: "Alice Johnson", email: "alice.johnson@email.com" },
  { id: "2", name: "Bob Smith", email: "bob.smith@email.com" },
  { id: "3", name: "Charlie Brown", email: "charlie.brown@email.com" },
  { id: "4", name: "Diana Prince", email: "diana.prince@email.com" },
  { id: "5", name: "Ethan Hunt", email: "ethan.hunt@email.com" },
  { id: "6", name: "Fiona Green", email: "fiona.green@email.com" },
  { id: "7", name: "George Miller", email: "george.miller@email.com" },
  { id: "8", name: "Hannah White", email: "hannah.white@email.com" },
  { id: "9", name: "Ivan Black", email: "ivan.black@email.com" },
  { id: "10", name: "Julia Roberts", email: "julia.roberts@email.com" },
];

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return NextResponse.json(
    {
      state: "success",
      data: {
        users,
        total: users?.length
      },
    },
    { status: 200 },
  );
}
