import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../data/challenges.json';

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
}

/**
 * The type for ChallengesProvider's children (which are React components)
 */
interface ChallengesProviderProps {
    children: ReactNode;
}

/**
 * The context in React allows different components to share information (variables,
 * objects etc) and functions
 */
export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    /**
     * The empty array indicates that this function will be executed only once, when
     * the component is first displayed in the screen
     */
    useEffect(() => {
        Notification.requestPermission();
    }, []);

    function levelUp() {
        setLevel(level + 1);
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
            }}
        >
            {children}
        </ChallengesContext.Provider>
    );
}
