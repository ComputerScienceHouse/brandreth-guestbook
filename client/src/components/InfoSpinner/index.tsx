import Spinner from '../Spinner';
import './infospinner.css';

export interface InfoSpinnerProps {
  children: React.ReactNode;
}

const InfoSpinner = ({ children }: InfoSpinnerProps) => (
  <div className="spinner-container">
    <Spinner className="info-spinner" />
    <span className="spinner-text">{children}</span>
  </div>
);

export default InfoSpinner;
