import { NextRequest, NextResponse } from "next/server";

export const users = [
  { id: 1, name: "Alice Johnson", email: "alice.johnson@email.com" },
  { id: 2, name: "Bob Smith", email: "bob.smith@email.com" },
  { id: 3, name: "Charlie Brown", email: "charlie.brown@email.com" },
];

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return NextResponse.json(
    {
      state: "success",
      data: {
        users,
        total: users?.length,
      },
    },
    { status: 200 },
  );
}

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();
    if (!name || !email) {
      return NextResponse.json(
        {
          status: "fail",
          data: {
            message: "Both fields are mandatory",
          },
        },
        { status: 400 },
      );
    }

    const user = {
      id: Date.now(),
      name,
      email,
    };

    users?.push(user);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return NextResponse.json(
      {
        status: "success",
        data: {
          message: "User added successfully!",
          user,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        error,
      },
      { status: 500 },
    );
  }
}
