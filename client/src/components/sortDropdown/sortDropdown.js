import DropdownHOC from "../dropdownHOC/dropdownHOC";

function SortDropdown() {

	
	return (
		<DropdownHOC
			title="Срочные наверх"
			items={
				[
					{
						color: '#E30613',
						title: 'Старые наверх'
					},
					{
						color: '#D5E6FF',
						title: 'Новые наверх'
					},
					{
					color: '#E4F3D2',
						title: 'По приоритету'
					}
				]
			}
		></DropdownHOC>
	);
}

export default SortDropdown;