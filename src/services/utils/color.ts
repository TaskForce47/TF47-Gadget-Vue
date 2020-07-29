export function getColor(type: any) {
	if (isNaN(type)) {
		switch (type) {
			case 'Warning':
				return 'orange';
			case 'Ban':
				return 'red';
			case 'Info':
				return 'white';
			case 'Whitelist added':
				return 'green';
			case 'Whitelist removed':
				return 'yellow';
			case 'Group':
				return 'green darken-1';
			case 'Side':
				return 'blue darken-1';
			case 'Direct':
				return 'grey';
			case 'Vehicle':
				return 'yellow darken-4';
			case 'Global':
				return 'grey';
			default:
				return 'orange';
		}
	} else {
		if (type > 0) {
			return 'green';
		} else {
			return 'red';
		}
	}
}
