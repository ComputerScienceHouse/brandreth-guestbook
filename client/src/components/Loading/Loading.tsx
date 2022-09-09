import { Spinner } from 'reactstrap';
import './Loading.scss';

interface LoadingProps {
  text?: string;
}

const Loading = ({ text = 'Loading...' }: LoadingProps) => (
  <div className="loading">
    <Spinner className="spinner" color="primary" />
    <h1>{text}</h1>
  </div>
);

export default Loading;
