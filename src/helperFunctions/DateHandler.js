export default {
  methods: {
    /**
     * Converts yyyy-mm-dd to dd-mm-yyyy
     */
    formatDDMMYYYY(DATE) {
      //console.log("DATE", DATE)
      let res = "";
      try {
        res = DATE.split("-")
          .reverse()
          .join("-");
      } catch(err) {
        res = ""
      }
      return res
    },
    /**
     * Format slots
     */
    
  },
};
