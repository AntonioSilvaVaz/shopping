import styles from './createItem.module.css';
import { AiOutlinePlus } from 'react-icons/ai';

export default function CreateItem() {
  return (
    <div className={styles.create_item}>
      <div className={styles.plus}>
        <AiOutlinePlus />
      </div>
      <h4>Add product</h4>
    </div>
  )
};