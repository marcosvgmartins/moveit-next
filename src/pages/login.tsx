import styles from '../styles/pages/Login.module.css';

export default function Login() {
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
                    <span>Faça login com seu GitHub para começar</span>
                </div>
                <div className={styles.loginInputContainer}>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Digite seu usuário"
                    ></input>
                    <button type="button">-></button>
                </div>
            </div>
        </div>
    );
}
