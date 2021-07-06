export default {
    methods: {
    /**
     * Takes Firestore timestamp as parameter, or Date
     */
     formatDDMMYYYY(DATE) {    
        console.log(" DATE", DATE)

        var formattedDate = ""
        var date = null

        if ( DATE instanceof Date) {
          date = DATE.toISOString()
        } else {
          date = DATE.toDate().toISOString()
        }

        formattedDate = date.slice(8, 10) + '/' 
          + date.slice(5, 7) + '/' 
          + date.slice(0, 4);

        return formattedDate
    }
    }
  };