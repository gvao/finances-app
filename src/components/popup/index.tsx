import styles from "./styles.module.css";
import { useState } from "react";
// import { useAccountContext } from "../../context/accounts";

type PopupProps = {
	children: React.ReactNode;
	onClose?(): void;
};

export function Popup({ children, onClose }: PopupProps) {
	// const { closePopup } = useAccountContext();
	const [isOpen, setIsOpen] = useState<boolean>(true);

	const onclick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		const target = event.target as HTMLElement;

		const classList = Array.from(target.classList);
		const isClose = classList.some((className) =>
			className.includes("wrapper")
		);
		if (isClose) {
			!!onClose && onClose();
			setIsOpen(!isOpen);
			return;
		}
	};

	if (!isOpen) return null;

	return (
		<section onClick={onclick} className={styles.wrapper}>
			<div className={`container ${styles.popup}`}>{children}</div>
		</section>
	);
}
