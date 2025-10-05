import type { APIRoute } from "astro";

const getRobotsTxt = () => `
User-agent: *
Disallow: /
`;

export const GET: APIRoute = ({ site }) => {
  return new Response(getRobotsTxt());
};
