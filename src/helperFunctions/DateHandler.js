export default {
    methods: {
    /**
     * Takes Firestore timestamp as parameter
     */
     formatDDMMYYYY(timestamp) {    
        var date = timestamp.toDate().toISOString()
        var formattedDate = date.slice(8, 10) + '/' 
                   + date.slice(5, 7) + '/' 
                   + date.slice(0, 4);
                   
        return formattedDate
    }
    }
  };