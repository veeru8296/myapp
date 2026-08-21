import classes from './loading.module.css';

export default function TodosLoadingPage() {
  return (
    <div className={classes.container}>
      <div className={classes.spinner}></div>
    </div>
  );
}