export function Button({ onClick, className, type, children }) {
	return (
		<button onClick={onClick} className={className} type={type}>
			{children}
		</button>
	);
}
