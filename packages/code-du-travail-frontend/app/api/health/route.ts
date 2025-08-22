import { NextResponse } from "next/server";
import { COMMIT, PACKAGE_VERSION } from "../../../src/config";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return NextResponse.json(
    {
      status: "up and running",
      version: PACKAGE_VERSION,
      commit: COMMIT,
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  );
}
