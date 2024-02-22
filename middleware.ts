import {NextResponse, NextRequest} from "next/server";
import {withAuth} from "next-auth/middleware";
import {decode} from "next-auth/jwt";
import {isUserAuthenticated} from "@/src/services/AuthServer";


export default withAuth(
    async function middleware(request: NextRequest) {
        let cookie = request.cookies.get(process.env.JWT_NAME)

        if (cookie === null) {
            const signinUrl = `${new URL('/login', request.url)}?error=NotCookiesFound`
            return NextResponse.redirect(signinUrl)
        } else {
            const user = await decode({token: cookie?.value, secret: process.env.JWT_SECRET});
            let userIsAuthenticated = false;

            if (user !== null) {
                const {accessToken} = user;
                userIsAuthenticated = await isUserAuthenticated(accessToken);
            }

            if (userIsAuthenticated) {
                return NextResponse.next()
            }
        }

        const signinUrl = `${new URL('/login', request.url)}?error=UserIsNotAuthenticated`;
        return NextResponse.redirect(signinUrl)
    },
    {
        callbacks: {
            authorized: ({req, token}) => {
                if (
                    req.nextUrl.pathname.startsWith('/protected') &&
                    token === null
                ) {
                    return false
                }
                return true
            }
        }
    }
)

export const config = {
    matcher: [
        '/lists/:path*',
        '/tasks/:path*'
    ],
}