import styles from './Loader.module.css';

const { Loader: loader } = styles;

export const Loader= ({ className = '' }) => {
  return (
    <div className={[loader, className].join(' ')} />
  );
};

Loader.defaultProps = {
  className: '',
};