import styles from './styles.module.css'

export default function CheckBox() {
	return (
		<>
			<div className={styles.checkBoxContainer}>
				<input className={styles.checkBoxInput} type="checkBox" id="cbl" />
				<label htmlFor="cbl" className={styles.checkBoxLabel}>Checkbox 1</label>
			</div>
		</>
	)
}
