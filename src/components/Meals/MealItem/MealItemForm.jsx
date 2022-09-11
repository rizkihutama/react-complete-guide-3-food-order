import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {
  return (
    <form action="#" className={classes.form}>
      <Input label="Amount" input={{ type: 'number', id: `meal_${props.mealId}`, min: 1, max: 5, defaultValue: 1 }} />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
