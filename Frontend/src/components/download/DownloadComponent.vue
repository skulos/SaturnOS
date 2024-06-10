<template>
    <div>
        <button @click="downloadData">Download Data</button>
    </div>
</template>

<script>
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import Papa from 'papaparse';

export default {
    name: 'DownloadComponent',
    methods: {
        async downloadData() {
            const zip = new JSZip();

            // Sample data for a pet shop
            const customers = [
                { id: 1, name: 'John Doe', email: 'john@example.com' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
            ];
            const pets = [
                { id: 1, name: 'Buddy', type: 'Dog', owner: 'John Doe' },
                { id: 2, name: 'Mittens', type: 'Cat', owner: 'Jane Smith' },
            ];
            const appointments = [
                { id: 1, pet: 'Buddy', date: '2024-06-10', service: 'Grooming' },
                { id: 2, pet: 'Mittens', date: '2024-06-11', service: 'Check-up' },
            ];

            // Convert data to CSV using PapaParse
            const customerCsv = Papa.unparse(customers);
            const petsCsv = Papa.unparse(pets);
            const appointmentsCsv = Papa.unparse(appointments);

            // Add CSV files to zip
            zip.file('customers.csv', customerCsv);
            zip.file('pets.csv', petsCsv);
            zip.file('appointments.csv', appointmentsCsv);

            // Generate zip and trigger download
            const content = await zip.generateAsync({ type: 'blob' });
            saveAs(content, 'petshop_data.zip');
        },
    },
};
</script>

<style scoped>
button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}
</style>