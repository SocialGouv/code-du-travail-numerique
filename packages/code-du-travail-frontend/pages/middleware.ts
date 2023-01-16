// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from "next/server";
import MappingReplacements from "../redirects.json";

export function middleware(request) {
  const urlReplaced = MappingReplacements.find(({ source }) => {
    request.nextUrl.pathname.startsWith(source);
  });
  if (urlReplaced) {
    return NextResponse.redirect(new URL(urlReplaced.destination, request.url));
  }
}
