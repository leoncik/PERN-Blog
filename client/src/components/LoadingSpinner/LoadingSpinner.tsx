// CSS
import classes from './LoadingSpinner.module.css';

type LoadingSpinnerProps = {
    spinnerColor: string;
};

/**
 * A loading spinner.
 * @param {string} props - Color of the loading spinner.
 * @returns {React.ReactElement} loading spinner component.
 */
function LoadingSpinner({ spinnerColor }: LoadingSpinnerProps) {
    return (
        <div className={classes['loading-spinner']}>
            <div
                style={{
                    borderColor: `${spinnerColor} transparent ${spinnerColor} transparent`,
                }}
                className={classes['spinner']}
            ></div>
        </div>
    );
}

export default LoadingSpinner;
