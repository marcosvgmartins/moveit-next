import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const { level, user } = useContext(ChallengesContext);
    return (
        <div className={styles.profileContainer}>
            <img src={user.image} alt={user.name} />
            <div>
                <strong>{user.name}</strong>
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
