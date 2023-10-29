export { default } from "next-auth/middleware";
export const config = { matcher: ["/profile/:path*", "/protected/:path*", "/dashboard/:path*"] };
