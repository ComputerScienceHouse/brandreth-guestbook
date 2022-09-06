import './spinner.css';

interface SpinnerProps {
  className: string;
}

const Spinner = ({ className }: SpinnerProps) => (
  <div className={`spinner ${className}`} />
);

export default Spinner;
