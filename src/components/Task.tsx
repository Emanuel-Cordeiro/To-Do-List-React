import styles from './Task.module.css'

import CircleIcon from '../assets/circle.svg'
import TrashIcon from '../assets/trash.svg'
import CheckIcon from '../assets/check.svg'

interface TasksProps {
  checked: boolean;
  content: string;
  onDelete: () => void;
  onCheck: () => void;
}

export function Task({ checked, content, onDelete, onCheck }: TasksProps) {

  return (
    <div className={styles.container}>
      <button onClick={onCheck} className={styles.button}>
        {checked ?
          <img className={styles.icon} src={CheckIcon} /> :
          <img className={styles.icon} src={CircleIcon} />
        }
      </button>
      <p className={checked ? styles.checked : styles.text}>{content}</p>
      <button className={styles.button} onClick={onDelete}>
        <img className={styles.trashIcon} src={TrashIcon} />
      </button>
    </div>
  )
}