export default async (request: Request) => {
  const url = new URL(request.url);

  // Only strip if not root and ends with "/"
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.replace(/\/+$/, ""); // remove all trailing slashes
    return Response.redirect(url.toString(), 301);
  }

  return; // fall through to origin
};
