import styles from '../styles/pages/Login.module.css';
import { providers, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

/**
 * Creates the login page
 *
 * In the end, it wasn't as straightforward as the docs indicated to use next-auth
 * with a custom page. Redirection wasn't working as expected. The following link
 * helped to solve the issues: https://github.com/nextauthjs/next-auth/issues/591
 *
 * @param providers: The providers configured by Next-Auth
 */
export default function Login({ providers }) {
    const router = useRouter();
    const callbackPage = Array.isArray(router.query.callbackUrl)
        ? router.query.callbackUrl[0]
        : router.query.callbackUrl;

    console.log(providers);
    return (
        <div className={styles.loginContainer}>
            <img src="icons/symbol.svg" alt="move.it symbol" />
            <div>
                <img src="logo-white.svg" alt="move.it logo" />
                <p className={styles.loginWelcome}>
                    <strong>Bem-vindo</strong>
                </p>
                <div>
                    <span>
                        <img src="icons/github.svg" alt="GitHub logo" />
                    </span>
                    <span>
                        Faça login com seu {providers['github'].name} para
                        começar
                    </span>
                </div>
                <div className={styles.loginInputContainer}>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Digite seu usuário"
                    ></input>
                    <button
                        type="button"
                        onClick={() =>
                            signIn(providers['github'].id, {
                                callbackUrl: callbackPage,
                            })
                        }
                    >
                        -&gt;
                    </button>
                </div>
            </div>
        </div>
    );
}

Login.getInitialProps = async () => {
    return {
        providers: await providers(),
    };
};
