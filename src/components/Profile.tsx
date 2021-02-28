import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const { level } = useContext(ChallengesContext);
    return (
        <div className={styles.profileContainer}>
            <img
                src="https://github.com/marcosvgmartins.png"
                alt="Marcos Martins"
            />
            <div>
                <strong>Marcos Martins</strong>
                <p>
                    {/* Everything inside 'public' is considered public and directly
                    accessible by NextJS. */}
                    <img src="icons/level.svg" alt="" />
                    Level {level}
                </p>
            </div>
        </div>
    );
}
