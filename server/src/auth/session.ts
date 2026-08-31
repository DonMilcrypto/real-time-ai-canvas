export type AuthUser = { id: string; email?: string; name?: string };

export interface AuthProvider { verify(request: Request): Promise<AuthUser | null>; }

export class BearerAuthProvider implements AuthProvider {
  constructor(private readonly verifier: (token: string) => Promise<AuthUser | null>) {}
  async verify(request: Request): Promise<AuthUser | null> {
    const value = request.headers.get("authorization");
    if (!value?.startsWith("Bearer ")) return null;
    return this.verifier(value.slice(7));
  }
}

export function requireUser(user: AuthUser | null): asserts user is AuthUser {
  if (!user) throw new Error("Authentication required");
}
