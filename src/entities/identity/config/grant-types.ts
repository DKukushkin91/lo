export const GrantTypes = {
    Password: 'password',
    RefreshToken: 'refresh_token',
    AuthorizationCode: 'authorization_code',
} as const;

export type TGrantTypes = (typeof GrantTypes)[keyof typeof GrantTypes];
