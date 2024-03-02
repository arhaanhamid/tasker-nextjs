export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    // FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      const isAuthenticated = !!user; // Check if user is authenticated based on their existence
      const isOnAdminPage = request.nextUrl?.pathname.startsWith("/admin");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
      const isOnRegisterPage =
        request.nextUrl?.pathname.startsWith("/register");
      const isOnAllowedPage = isOnLoginPage || isOnRegisterPage; // Check for permitted pages

      if (!isAuthenticated && !isOnAllowedPage) {
        return false;
      }

      if (isAuthenticated && !user?.isAdmin && isOnAdminPage) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      if (isAuthenticated && isOnAllowedPage) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};
