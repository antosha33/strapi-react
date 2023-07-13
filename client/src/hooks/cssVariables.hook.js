import { useEffect } from "react";


function useCssVariables() {

	useEffect(() => {
		const scrollWidth = getScrollbarWidth();
		setVariable({
			prop: '--scrollWidth',
			value: scrollWidth + 'px'
		})
	}, [])


	const setVariable = ({ prop, value }) => {
		document.documentElement.style
			.setProperty(prop, value);
	}


	const getScrollbarWidth = () => {
		const outer = document.createElement('div');
		outer.style.visibility = 'hidden';
		outer.style.overflow = 'scroll';
		outer.style.msOverflowStyle = 'scrollbar';
		document.body.appendChild(outer);
		const inner = document.createElement('div');
		outer.appendChild(inner);
		const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
		outer.parentNode.removeChild(outer);
		return scrollbarWidth;
	}

}

export default useCssVariables;