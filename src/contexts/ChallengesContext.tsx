import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../data/challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

/**
 * The Challenge type, according to the information at challenges.json
 */
interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

/**
 * Interface that describes everything that ChallengesProvider exports in the context
 */
interface ChallengesContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

/**
 * The type for ChallengesProvider's children (which are React components)
 */
interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

/**
 * The context in React allows different components to share information (variables,
 * objects etc) and functions
 */
export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
    children,
    ...reaminingProps
}: ChallengesProviderProps) {
    const [level, setLevel] = useState(reaminingProps.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(
        reaminingProps.currentExperience ?? 0
    );
    const [challengesCompleted, setChallengesCompleted] = useState(
        reaminingProps.challengesCompleted ?? 0
    );
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    /**
     * The empty array indicates that this function will be executed only once, when
     * the component is first displayed in the screen
     */
    useEffect(() => {
        Notification.requestPermission();
    }, []);

    /**
     * Cookies will be used to store information about level and experience.
     * They'll be used instead of the browser's local storage because we're using
     * Next.js, therefore we need Next's intermediary back-end (Node) to be able to
     * access this information to properly render the React components
     */
    useEffect(() => {
        console.log('Setting cookies');
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(
            Math.random() * challenges.length
        );
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        /**
         * If notifications were allowed
         */
        if (Notification.permission === 'granted') {
            new Audio('/notification.mp3').play();
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp!`,
            });
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;
        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                experienceToNextLevel,
                challengesCompleted,
                activeChallenge,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal,
            }}
        >
            {children}

            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
}
