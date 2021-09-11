export default {
    methods: {
    /**
     *  Converts yyyy-mm-dd to dd-mm-yyyy
     */
     formatDDMMYYYY(DATE) {    
        //console.log(" DATE", DATE)

        return DATE.split('-').reverse().join('-')
    }
    }
  };