class DateManagement {
    constructor() {
        this.dateFormat = 'dd/MM/yyyy';
    }

    getCurrentDate() {
        return new Date(); // Devuelve la fecha y hora actuales
    }

    getCurrentLocalDate() {
        return new Date().toLocaleDateString('en-GB'); // Obtiene la fecha actual en formato local
    }

    getCurrentDateFormatted() {
        const currentDate = new Date(); // Obtiene la fecha actual
        const formatter = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return formatter.format(currentDate); // Devuelve la fecha formateada como una cadena de texto
    }

    async chooseDate() {
        return new Promise((resolve) => {
            const input = document.createElement('input');
            input.type = 'text';
            document.body.appendChild(input);

            // Utilizar Flatpickr para seleccionar la fecha
            flatpickr(input, {
                dateFormat: this.dateFormat,
                onClose: function(selectedDates) {
                    const selectedDate = selectedDates[0];
                    resolve(selectedDate);
                    document.body.removeChild(input);
                }
            });

            input.focus();
        });
    }

    formatDate(date) {
        if (!date) {
            return ''; // Si la fecha es null, devolvemos una cadena vacía
        }
        const formatter = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return formatter.format(date); // Devolvemos la fecha formateada como una cadena de texto
    }

    validateDateInput(message) {
        while (true) {
            const userInput = prompt(`${message} (dd/MM/yyyy):`);
            const parsedDate = this.parseFlatpickrDate(userInput);
            if (parsedDate) {
                return parsedDate;
            } else {
                alert('Formato de fecha inválido. Intente nuevamente (dd/MM/yyyy).');
            }
        }
    }

    // Nuevo método para formatear la fecha ingresada por Flatpickr como dd/MM/yyyy
    formatFlatpickrDate(date) {
        if (!date) {
            return ''; // Si la fecha es null, devolvemos una cadena vacía
        }
        const formatter = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return formatter.format(date); // Devolvemos la fecha formateada como una cadena de texto
    }

    // Nuevo método para parsear la fecha ingresada por Flatpickr en formato dd/MM/yyyy
    parseFlatpickrDate(dateString) {
        const [day, month, year] = dateString.split('/');
        const parsedDate = new Date(year, month - 1, day); // Restamos 1 al mes para que sea compatible con el formato de JavaScript (enero es 0)
        return isNaN(parsedDate.getTime()) ? null : parsedDate;
    }
    
    formatValidatedDate(validatedDate) {
        return this.formatFlatpickrDate(validatedDate);
    }
}
