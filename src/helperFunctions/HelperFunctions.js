// import { jsPDF } from "jspdf";

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
      } catch (err) {
        res = "";
      }
      return res;
    },
    /**
     * Export to PDF
     */
    toPDF(data) {
      console.log("exporting to PDF ...", data);
      // Default export is a4 paper, portrait, using millimeters for units
      // let doc
      // try {
      //   doc = new jsPDF();
      // } catch(err) {
      //   console.log(err)
      // }
      // console.log("doc", doc)
      // doc.text("Hello world!", 10, 10);
      // doc.save("a4.pdf");
      // console.log("exported")
    },
  },
};
