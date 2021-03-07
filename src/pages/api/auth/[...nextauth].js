import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        /**
         * @param  {string} url      URL provided as callback URL by the client
         * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
         * @return {string}          URL the client will be redirect to
         */
        redirect: async (url, baseUrl) => {
            console.log('URL: ' + url);
            console.log('Base URL: ' + baseUrl);
            return url.startsWith(baseUrl)
            ? Promise.resolve(url)
            : Promise.resolve(baseUrl)
        }
      }
}

export default (req, res) => NextAuth(req, res, options)