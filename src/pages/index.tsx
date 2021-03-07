import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { CountDown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import styles from '../styles/pages/Home.module.css';

import Head from 'next/head';
import { CountdownProvider } from '../contexts/CountdownContext';
import { GetServerSideProps } from 'next';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { getSession } from 'next-auth/client';
import { User } from 'next-auth';

interface HomeProps {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    user: User;
}

export default function Home(props: HomeProps) {
    return (
        <ChallengesProvider
            level={props.level}
            currentExperience={props.currentExperience}
            challengesCompleted={props.challengesCompleted}
            user={props.user}
        >
            <div className={styles.container}>
                <Head>
                    <title>Início | moveit</title>
                </Head>
                <ExperienceBar />

                <CountdownProvider>
                    <section>
                        <div>
                            <Profile />
                            <CompletedChallenges />
                            <CountDown />
                        </div>
                        <div>
                            <ChallengeBox />
                        </div>
                    </section>
                </CountdownProvider>
            </div>
        </ChallengesProvider>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
    const session = await getSession(ctx);

    if (!session) {
        return {
            redirect: { destination: '/api/auth/signin', permanent: false },
            props: {},
        };
    }

    console.log(session);

    return {
        props: {
            level: Number(level),
            currentExperience: Number(currentExperience),
            challengesCompleted: Number(challengesCompleted),
            user: session.user,
        },
    };
};
