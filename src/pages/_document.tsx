import Document, { Html, Head, Main, NextScript } from 'next/document';

/* Everything in _document is only loaded once */

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <Head>
                        <link
                            rel="shortcut icon"
                            href="favicon.png"
                            type="image/png"
                        />
                        <link
                            rel="preconnect"
                            href="https://fonts.gstatic.com"
                        />
                        <link
                            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&family=Rajdhani:wght@600&display=swap"
                            rel="stylesheet"
                        />
                    </Head>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
