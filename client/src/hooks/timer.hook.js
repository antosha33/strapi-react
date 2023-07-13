import { useRef, useState, useEffect, useCallback } from "react";

function useTimer({ onFinish = undefined } = {}) {

	const interval = useRef(null);

	const [isFinished, setIsFinished] = useState(true)

	const [value, setValue] = useState(null);

	const start = useCallback((time) => {
		if (interval.current) return;
		setIsFinished(false);
		setValue(time);
		interval.current = setInterval(() => {
			setValue(prev => prev - 1)
		}, 1000)
	}, [])

	const clear = useCallback(() => {
		clearInterval(interval.current);
		interval.current = null;
		setIsFinished(true);
	},[])

	useEffect(() => {
		if (value <= 0 && value != null) {
			onFinish && onFinish()
			clear();
		}
	}, [value, onFinish, clear])

	useEffect(() => {
		return clearInterval(interval.current)
	}, [])

	return (
		{
			value,
			start,
			clear,
			isFinished
		}
	)
}

export default useTimer;
