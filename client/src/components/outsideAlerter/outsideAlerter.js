import React, { useRef, useEffect } from "react";


/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, onEvent) {
	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				onEvent()
			}
		}
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideAlerter({ tr = false, onEvent, setRef, children, ...props }) {

	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef, onEvent);

	const applyRef = (ref) => {
		wrapperRef.current = ref;
		setRef && setRef(ref)
	}

	if (tr) {
		return <tr ref={ref => applyRef(ref)} {...props}>{children}</tr>;
	}

	return <div ref={ref => applyRef(ref)}{...props}>{children}</div>;
}



export default OutsideAlerter;