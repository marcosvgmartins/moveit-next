import { useContext, useEffect, useState } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function CountDown() {
    const {
        minutes,
        seconds,
        isActive,
        hasFinished,
        startCountdown,
        resetCountdown,
    } = useContext(CountdownContext);
    /* padStart will fill the string so that it has 2 characters */
    const [minuteLeft, minuteRight] = String(minutes)
        .padStart(2, '0')
        .split('');
    const [secondLeft, secondRight] = String(seconds)
        .padStart(2, '0')
        .split('');

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinished ? (
                <button disabled className={styles.countdownButton}>
                    Abandonar ciclo
                </button>
            ) : (
                <>
                    {isActive ? (
                        <button
                            type="button"
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                            onClick={resetCountdown}
                        >
                            Abandonar ciclo
                        </button>
                    ) : (
                        <button
                            type="button"
                            className={`${styles.countdownButton}`}
                            onClick={startCountdown}
                        >
                            Iniciar ciclo
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
